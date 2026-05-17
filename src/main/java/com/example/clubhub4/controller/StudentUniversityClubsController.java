package com.example.clubhub4.controller;

import com.example.clubhub4.entity.ApplicationStatus;
import com.example.clubhub4.dto.ClubCardView;
import com.example.clubhub4.service.ExploreService;
import com.example.clubhub4.repository.*;
import com.example.clubhub4.security.AppUserPrincipal;
import com.example.clubhub4.entity.User;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Controller
@RequestMapping("/student/university/clubs")
@RequiredArgsConstructor
public class StudentUniversityClubsController {

    private final ExploreService exploreService;
    private final UserRepository userRepository;
    private final ClubRepository clubRepository;
    private final ClubApplicationRepository clubApplicationRepository;
    private final ClubMemberRepository clubMemberRepository;

    @GetMapping
    public String list(@AuthenticationPrincipal AppUserPrincipal principal,
                       @RequestParam(defaultValue = "name") String sort, // name | followers | members | recent
                       @RequestParam(defaultValue = "0") int page,
                       @RequestParam(defaultValue = "12") int size,
                       HttpServletRequest request,
                       Model model) {

        User user = userRepository.findById(principal.getId()).orElse(null);
        boolean noUniversity = (user == null || user.getUniversityId() == null);
        model.addAttribute("noUniversity", noUniversity);

        if (noUniversity) {
            return "student/university-clubs";
        }

        UUID universityId = user.getUniversityId();
        Page<ClubCardView> clubs = exploreService.searchClubs(null, null, universityId, sort, page, size);

        // Build back URL for apply buttons if you later support redirect back
        String back = request.getRequestURI();
        if (request.getQueryString() != null) back += "?" + request.getQueryString();

        Set<UUID> eligibleApplyIds = Set.of();
        Map<UUID, ApplicationStatus> applicationStatuses = Map.of();
        Set<UUID> cancelEligibleIds = Set.of();
        Set<UUID> reapplyEligibleIds = Set.of();
        Set<UUID> memberClubIds = Set.of();

        if (!clubs.isEmpty()) {
            List<UUID> ids = clubs.getContent().stream().map(ClubCardView::id).toList();

            // Eligible to apply
            eligibleApplyIds = clubRepository.findEligibleApplyClubIds(principal.getId(), ids);

            // Current applications
            var apps = clubApplicationRepository.findByUserAndClubs(principal.getId(), ids);
            Map<UUID, ApplicationStatus> statusMap = new HashMap<>();
            Set<UUID> cancel = new HashSet<>();
            Set<UUID> reapply = new HashSet<>();
            for (var a : apps) {
                UUID cid = a.getClub().getId();
                statusMap.put(cid, a.getStatus());
                if (a.getStatus() == ApplicationStatus.PENDING) cancel.add(cid);
                if (a.getStatus() == ApplicationStatus.REJECTED) reapply.add(cid);
            }
            applicationStatuses = statusMap;
            cancelEligibleIds = cancel;
            reapplyEligibleIds = reapply;

            // Membership flags
            memberClubIds = clubMemberRepository.findMemberClubIds(principal.getId(), ids);
        }

        model.addAttribute("clubs", clubs);
        model.addAttribute("sort", sort);
        model.addAttribute("page", page);
        model.addAttribute("size", size);
        model.addAttribute("back", back);

        model.addAttribute("eligibleApplyIds", eligibleApplyIds);
        model.addAttribute("applicationStatuses", applicationStatuses);
        model.addAttribute("cancelEligibleIds", cancelEligibleIds);
        model.addAttribute("reapplyEligibleIds", reapplyEligibleIds);
        model.addAttribute("memberClubIds", memberClubIds);

        return "student/university-clubs";
    }
}