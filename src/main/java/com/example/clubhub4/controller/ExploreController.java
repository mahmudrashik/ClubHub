package com.example.clubhub4.controller;
import com.example.clubhub4.entity.ApplicationStatus;
import com.example.clubhub4.dto.ClubCardView;
import com.example.clubhub4.service.ExploreService;
import com.example.clubhub4.repository.*;
import com.example.clubhub4.security.AppUserPrincipal;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Controller
@RequiredArgsConstructor
@RequestMapping("/explore")
public class ExploreController {

    private final ExploreService exploreService;
    private final CountryRepository countryRepository;
    private final UniversityRepository universityRepository;
    private final ClubRepository clubRepository;
    private final ClubApplicationRepository clubApplicationRepository;
    private final ClubMemberRepository clubMemberRepository;

    @GetMapping("/clubs")
    public String clubs(@RequestParam(required = false) String q,
                        @RequestParam(required = false) Integer countryId,
                        @RequestParam(required = false) UUID universityId,
                        @RequestParam(defaultValue = "name") String sort, // name | followers | members | recent
                        @RequestParam(defaultValue = "0") int page,
                        @RequestParam(defaultValue = "12") int size,
                        @AuthenticationPrincipal AppUserPrincipal principal,
                        HttpServletRequest request,
                        Model model) {

        // Page of clubs
        Page<ClubCardView> clubs = exploreService.searchClubs(q, countryId, universityId, sort, page, size);

        // Build back URL for follow buttons (and optional use elsewhere)
        String back = request.getRequestURI();
        if (request.getQueryString() != null) back += "?" + request.getQueryString();

        // Defaults for anonymous or empty page
        Set<UUID> followedIds = Set.of();
        Set<UUID> eligibleApplyIds = Set.of();
        Map<UUID, ApplicationStatus> applicationStatuses = Map.of();
        Set<UUID> cancelEligibleIds = Set.of();
        Set<UUID> reapplyEligibleIds = Set.of();
        Set<UUID> memberClubIds = Set.of();

        if (principal != null && !clubs.isEmpty()) {
            List<UUID> ids = clubs.getContent().stream().map(ClubCardView::id).toList();

            // Follow state
            followedIds = exploreService.followedClubIds(principal.getId(), ids);

            // Eligible to apply (same uni, not member, no application yet)
            eligibleApplyIds = clubRepository.findEligibleApplyClubIds(principal.getId(), ids);

            // Current applications (for status/cancel/reapply)
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

        // Dropdowns
        var countries = countryRepository.findAllByOrderByNameAsc();
        var universities = (countryId != null)
                ? universityRepository.findByCountryIdOrderByNameAsc(countryId)
                : List.of();

        // Model
        model.addAttribute("clubs", clubs);
        model.addAttribute("q", q);
        model.addAttribute("countryId", countryId);
        model.addAttribute("universityId", universityId);
        model.addAttribute("sort", sort);
        model.addAttribute("page", page);
        model.addAttribute("size", size);
        model.addAttribute("countries", countries);
        model.addAttribute("universities", universities);
        model.addAttribute("back", back);

        model.addAttribute("followedIds", followedIds);
        model.addAttribute("eligibleApplyIds", eligibleApplyIds);
        model.addAttribute("applicationStatuses", applicationStatuses);
        model.addAttribute("cancelEligibleIds", cancelEligibleIds);
        model.addAttribute("reapplyEligibleIds", reapplyEligibleIds);
        model.addAttribute("memberClubIds", memberClubIds);

        return "explore/clubs";
    }
}