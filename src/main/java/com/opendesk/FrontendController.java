package com.opendesk;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FrontendController {

    @GetMapping(value = {
        "/",
        "/auth",
        "/reports",
        "/saved",
        "/profile",
        "/map",
        "/spots/{spotId}",
        "/spots/{spotId}/report",
        "/spots/{spotId}/report/confirm"
    })
    public String forwardToReact() {
        return "forward:/index.html";
    }
}