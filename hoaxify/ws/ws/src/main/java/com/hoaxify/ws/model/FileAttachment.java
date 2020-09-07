<<<<<<< HEAD
package com.hoaxify.ws.model;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Data;

@Data
@Table(name="FILEATTACHMENT",catalog ="SPRINGREACTPROJECT")
@Entity
public class FileAttachment {

	@Id
	@SequenceGenerator(name="FILEATTACHMENT_SEQ", sequenceName="FILEATTACHMENT_SEQ", allocationSize=1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="FILEATTACHMENT_SEQ")
	@Column(name="ID", nullable = false)
	private long id;

	@Column(name="NAME")
	private String name;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="FILEATTACHMENT_CREATED_TIME")
	private Date date;
	
	@Column(name="FILETYPE")
	private String fileType;

	@OneToOne(mappedBy = "fileAttachment", cascade = CascadeType.MERGE)
	private Hoax hoax;
}
=======
package com.hoaxify.ws.model;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Data;

@Data
@Table(name="FILEATTACHMENT",catalog ="SPRINGREACTPROJECT")
@Entity
public class FileAttachment {

	@Id
	@SequenceGenerator(name="FILEATTACHMENT_SEQ", sequenceName="FILEATTACHMENT_SEQ", allocationSize=1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="FILEATTACHMENT_SEQ")
	@Column(name="ID", nullable = false)
	private long id;

	@Column(name="NAME")
	private String name;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="FILEATTACHMENT_CREATED_TIME")
	private Date date;
	
	@Column(name="FILETYPE")
	private String fileType;

	@OneToOne(mappedBy = "fileAttachment", cascade = CascadeType.MERGE)
	private Hoax hoax;
}
>>>>>>> Your message about the commit
