package com.example.clubhub4.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final UserDetailsService userDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider(PasswordEncoder encoder) {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider(userDetailsService);
        provider.setPasswordEncoder(encoder);
        return provider;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authenticationProvider(daoAuthenticationProvider(passwordEncoder()))

                .authorizeHttpRequests(auth -> auth
                        // Public pages and assets
                        .requestMatchers("/", "/dashboard", "/login", "/signup", "/register", "/error", "/403",
                                "/css/**", "/js/**", "/images/**", "/favicon.ico").permitAll()
                        .requestMatchers(HttpMethod.GET, "/explore/**", "/clubs/**", "/logout","/uploads/**").permitAll()
                        // Public API (return 0 when unauthenticated to avoid popup)
                        .requestMatchers(HttpMethod.GET, "/api/me/notifications/**").permitAll()

                        .requestMatchers(org.springframework.http.HttpMethod.GET, "/me/home").authenticated()

                        // Actions (auth required but not role-specific)
                        .requestMatchers(HttpMethod.POST, "/clubs/*/follow").authenticated()
                        .requestMatchers(HttpMethod.POST, "/posts/*/like").authenticated()
                        .requestMatchers(HttpMethod.POST, "/posts/*/comments").authenticated()
                        .requestMatchers(HttpMethod.POST, "/posts/*/comments/*/delete").authenticated()

                        .requestMatchers(HttpMethod.POST, "/clubs/*/posts").authenticated()
                        .requestMatchers(HttpMethod.GET,  "/clubs/*/posts/*/edit").authenticated()
                        .requestMatchers(HttpMethod.POST, "/clubs/*/posts/*").authenticated()
                        .requestMatchers(HttpMethod.POST, "/clubs/*/posts/*/delete").authenticated()

                        .requestMatchers(HttpMethod.GET,  "/me/posts/new").authenticated()
                        .requestMatchers(HttpMethod.POST, "/me/posts").authenticated()

                        // Applications: only students can apply
                        .requestMatchers(HttpMethod.POST, "/clubs/*/apply").hasRole("STUDENT")
                        .requestMatchers(org.springframework.http.HttpMethod.POST, "/clubs/*/apply/reapply").hasRole("STUDENT")
                        .requestMatchers(org.springframework.http.HttpMethod.POST, "/clubs/*/apply/cancel").hasRole("STUDENT")

                        // Role areas
                        .requestMatchers("/student/**").hasRole("STUDENT")
                        .requestMatchers("/club/**").hasRole("CLUB_ADMIN")
                        .requestMatchers("/university/**").hasRole("UNIVERSITY_ADMIN")

                        // Everything else requires auth
                        .anyRequest().authenticated()
                )

                .formLogin(form -> form
                        .loginPage("/login")
                        .usernameParameter("email")
                        .passwordParameter("password")
                        // After login, go to smart route unless there's a saved request
                        .defaultSuccessUrl("/me/home", false)
                        .permitAll()
                )

                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("/login?logout")
                        .permitAll()
                )

                .exceptionHandling(ex -> ex
                        .accessDeniedPage("/403")
                );

        // Do NOT enable httpBasic() — prevents browser login popups
        return http.build();
    }

}
