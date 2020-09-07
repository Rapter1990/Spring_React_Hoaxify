package com.hoaxify.ws.controller;

import java.util.Collections;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hoaxify.ws.model.FileAttachment;
import com.hoaxify.ws.service.FileService;

@RestController
public class FileController {

	@Autowired
	FileService fileService;

	@PostMapping("/hoax-attachments")
	FileAttachment saveHoaxAttachment(MultipartFile file) {
		return fileService.saveHoaxAttachment(file);
	}

}
