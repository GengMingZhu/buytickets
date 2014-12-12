package com.ie.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ie.server.CookiesServer;

@Controller
@RequestMapping("/cookies")
public class CookiesController {
	
	@Resource
	CookiesServer cookiesServer;

	@RequestMapping("/getCookies")
	@ResponseBody
	public Map<String,Object> getCookies(){
		Map<String,Object> map = new HashMap<String,Object>();
		try{
			map = cookiesServer.getCookies();
		}catch(Exception e){
			e.printStackTrace();
		}
		return map;
	}
}
