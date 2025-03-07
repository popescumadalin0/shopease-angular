package com.ecommerce.shopease.security.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:4200/")
@PreAuthorize("hasRole('ADMIN') OR hasRole('USER')")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/role")
    @PreAuthorize("hasAuthority('admin:read') OR hasAuthority('user:read')")
    public ResponseEntity<String> getUserRole() {
        String userRole = userService.getCurrentUserRole();
        return ResponseEntity.ok().body(userRole);
    }
}
