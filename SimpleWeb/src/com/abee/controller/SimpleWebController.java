package com.abee.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class SimpleWebController {
	
	@RequestMapping(value = "/home", method = RequestMethod.GET)
	public String printHello(ModelMap model) {
		model.addAttribute("message", "Hi Batman!");
		return "index";
	}

}
