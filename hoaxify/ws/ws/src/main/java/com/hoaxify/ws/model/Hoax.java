package com.hoaxify.ws.model;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
@Table(name="HOAX",catalog ="SPRINGREACTPROJECT")
@Entity
public class Hoax {

	@Id
	@SequenceGenerator(name="HOAX_SEQ", sequenceName="HOAX_SEQ", allocationSize=1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="HOAX_SEQ")
	@Column(name="ID", nullable = false)
	private long id;

	@Size(min=1, max=1000)
	@Column(name="CONTENT",length = 1000)
	private String content;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="CREATED_TIME")
	private Date timestamp;
	
	@ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "USER_ID")
	private User user;
	
	@OneToOne(cascade = {CascadeType.MERGE , CascadeType.REMOVE})
    @JoinColumn(name = "FILEATTACHMENT_ID")
	//@OneToOne(mappedBy = "hoax" , cascade = {CascadeType.MERGE , CascadeType.REMOVE})
	//@JoinColumn(name = "FILEATTACHMENT_ID")
	private FileAttachment fileAttachment;

}