package com.hoaxify.ws.projection;

import com.hoaxify.ws.model.Hoax;

import lombok.Data;

@Data
public class HoaxVM {

	private long id;

	private String content;

	private long timestamp;

	private UserVM user;
	
	private FileAttachmentVM fileAttachment;

	public HoaxVM(Hoax hoax) {
		this.setId(hoax.getId());
		this.setContent(hoax.getContent());
		this.setTimestamp(hoax.getTimestamp().getTime());
		this.setUser(new UserVM(hoax.getUser()));
		if(hoax.getFileAttachment() != null) {			
			this.fileAttachment = new FileAttachmentVM(hoax.getFileAttachment());
		}
	}
}
