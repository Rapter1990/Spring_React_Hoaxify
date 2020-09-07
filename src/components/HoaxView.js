import React from 'react';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { deleteHoax } from '../api/apiCalls';

// 479 ) HoaxView stateless functional component olarak tanımladık
const HoaxView = props => {
  // 480 ) props 'tan hoax aldık
  const { hoax, onDeleteHoax } = props;

  // 526 ) Loggin olan username aldık
  const loggedInUser = useSelector(store => store.username);

  // 490 ) hoax tan user ve content aldık
  // 523 ) fileAttachment ekledik
  const { user, content, timestamp, fileAttachment, id } = hoax;

  // 491 ) user 'dan username, displayName, image aldık
  const { username, displayName, image } = user;

  // 495 ) useTranslation ile i18n aldık
  const { i18n } = useTranslation();

  // 496 ) timestamp i18n.language göre formatladık (i18n.language tr olarak çevirince timestamp ona göre olacak default olarak "en" (ingilizce))
  const formatted = format(timestamp, i18n.language);

  // 527 ) ownedByLoggedInUser username loggedInUser eşitmi diye baktık
  const ownedByLoggedInUser = loggedInUser === username;


  // 530 ) onClickDelete tanımladık
  const onClickDelete = async () => {
    await deleteHoax(id);
    onDeleteHoax(id);
  };

  // 492 ) HoaxView alanını şu şekilde yaptık
  return (
    <div className="card p-1">
      <div className="d-flex">
        <ProfileImageWithDefault image={image} width="32" height="32" className="rounded-circle m-1" />
        <div className="flex-fill m-auto pl-2">
          <Link to={`/user/${username}`} className="text-dark">
            <h6 className="d-inline">
              {displayName}@{username}
            </h6>
            <span> - </span>
            <span>{formatted}</span>
          </Link>
        </div>
        {ownedByLoggedInUser && (
          <button className="btn btn-delete-link btn-sm" onClick={onClickDelete}>
            <i className="material-icons">delete_outline</i>
          </button>
        )}
      </div>
      <div className="pl-5">{content}</div>
      {fileAttachment && (
        <div className="pl-5">
          {fileAttachment.fileType.startsWith('image') && (
            <img className="img-fluid" src={'api/1.0/images/attachments/' + fileAttachment.name} alt={content} />
          )}
          {!fileAttachment.fileType.startsWith('image') && <strong>Hoax has unknown attachment</strong>}
        </div>
      )}
    </div>
  );
};

export default HoaxView;