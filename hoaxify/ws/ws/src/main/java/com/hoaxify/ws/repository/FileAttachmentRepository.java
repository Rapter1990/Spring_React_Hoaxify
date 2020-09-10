package com.hoaxify.ws.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hoaxify.ws.model.FileAttachment;
import com.hoaxify.ws.model.User;

public interface FileAttachmentRepository extends JpaRepository<FileAttachment, Long>{

	List<FileAttachment> findByDateBeforeAndHoaxIsNull(Date date);
	
	List<FileAttachment> findByHoaxUser(User user);
}
