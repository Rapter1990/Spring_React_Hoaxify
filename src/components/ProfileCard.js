import React, { useState, useEffect } from 'react';
// 329 ) withRouter ve connect işlemini Hook ile useParams  ve useSelector  ile yaptık.
import { useParams, useHistory } from 'react-router-dom';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { useTranslation } from 'react-i18next';
import Input from './Input';
import { updateUser, deleteUser } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';
import { useSelector, useDispatch } from 'react-redux';
import { updateSuccess, logoutSuccess  } from '../redux/authActions';
import Modal from './Model';

// 221 ) Redux kullanacağımız için AuthenticationContext Kaldırdık  
// import { Authentication } from '../shared/AuthenticationContext';

// 199 ) ProfileCard oluşturduk (username ekranda göstermek için)
// withRouter kullanarak props(props =>) methoda yolladık
const ProfileCard = props => {

  // 411 ) inEditMode değişkenini false olarak tanımladık
  const [inEditMode, setInEditMode] = useState(false);

  // 436 ) editable false olarak tanımladık
  const [editable, setEditable] = useState(false);

  // 330 ) useSelector ilemini kullanarak username aldık
  const { username: loggedInUsername } = useSelector(store => ({ username: store.username }));

  // 438 ) Image değişkenini useState ile tanımladık
  const [newImage, setNewImage] = useState();

  // 331 ) useParams ile routeParams belirledik
  const routeParams = useParams();

  // 332 ) routeParams daki username aldık.
  const pathUsername = routeParams.username;

  //const loggedInUsername = props.username;
  let message = 'We cannot edit';

  // 543 ) modalVisible false olarak belirledik
  const [modalVisible, setModalVisible] = useState(false);

  // 417 ) updatedDisplayName değişkeni tanımladık
  const [updatedDisplayName, setUpdatedDisplayName] = useState();

  // 412 ) useTranslation kullanarak i18n (Türkçe , İngilizce dil değiştirme olayını yazptık)
  const { t } = useTranslation();

  // 431 ) useState ile user tanımladık
  const [user, setUser] = useState({});

  // 449 ) validationErrors useState ile boş obje olarak tanımladık
  const [validationErrors, setValidationErrors] = useState({});


  // 463 ) Bilgileri başka yerlere taşımak için dispatch kullandık.
  const dispatch = useDispatch();

  // 542 ) history tanımladık
  const history = useHistory();

  // 432 ) useEffect ile setUser atadım
  useEffect(() => {
    setUser(props.user);
  }, [props.user]);


  // 437 ) useEffect ile setEditable belirledik
  useEffect(() => {
    setEditable(pathUsername === loggedInUsername);
  }, [pathUsername, loggedInUsername]);

  // 264 ) loggedInUsername redux'da bulunan props tan aldık
  /*if (pathUsername === loggedInUsername) {
    message = 'We can edit';
  }*/

  // 435 ) pathUsername === loggedInUsername ise editable true değilse false olacak şekilde editable değişkeni tanımladık
  // const editable = pathUsername === loggedInUsername;

  // return <div>{message}</div>;

  // 396 ) imageSource belirledik
  // 402 ) bu kısma gerek kalmadı
  // let imageSource = defaultPicture;
  // if (image) {
  //   imageSource = image;
  // }

  // 450 ) useEffect ile daha önceden hata olduğunda başka bir şey girildiğinde ilk olarak updatedDisplayName undefined yapmak için
  useEffect(() => {
    setValidationErrors(previousValidationErrors => ({
      ...previousValidationErrors,
      displayName: undefined
    }));
  }, [updatedDisplayName]);

  // 453 ) useEffect ile daha önceden hata olduğunda başka bir şey girildiğinde ilk olarak image undefined yapmak için 
  useEffect(() => {
    setValidationErrors(previousValidationErrors => ({
      ...previousValidationErrors,
      image: undefined
    }));
  }, [newImage]);

  // 395 ) props'tan user aldık ve ondan username, displayName, image belirledik
  // const { user } = props;
  const { username, displayName, image } = user;

  // 544 ) pendingApiCallDeleteUser tanımladık
  const pendingApiCallDeleteUser = useApiProgress('delete', `/api/1.0/users/${username}`, true);

  // 418 ) useEffect tanımladık inEditMode göre displayName'e set edecek ve iki tane parametre alacak
  useEffect(() => {
    if (!inEditMode) {
      setUpdatedDisplayName(undefined);
      // 442 ) newImage işlem bittikten sonra displayName gibi undefined yaptık
      setNewImage(undefined);
    } else {
      setUpdatedDisplayName(displayName);
    }
  }, [inEditMode, displayName]);

  // 419 ) updatedDisplayName göstermek için onClickSave methodunu çağırdık
  // 433 ) onClickSave'deki işlemi yaptık
  const onClickSave = async () => {

    // 448 ) newImage varsa , den sonraki kısmı alacağız
    let image;
    if (newImage) {
      image = newImage.split(',')[1];
    }

    const body = {
      displayName: updatedDisplayName,
      image
    };
    try {
      const response = await updateUser(username, body);
      setInEditMode(false);
      setUser(response.data);
      dispatch(updateSuccess(response.data));
    } catch (error) {
      setValidationErrors(error.response.data.validationErrors);
    }
  };

  // 439 ) Seçilen image göre dosyayı değiştirme
  const onChangeFile = event => {

    // 449 ) Dosya yoksa return edecek
    if (event.target.files.length < 1) {
      return;
    }

    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setNewImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  // 545 ) onClickCancel tanımladık
  const onClickCancel = () => {
    setModalVisible(false);
  };

  // 546 ) onClickDeleteUser tanımladık (Api Call olduğu için async await yaptık)
  const onClickDeleteUser = async () => {
    await deleteUser(username);
    setModalVisible(false);
    dispatch(logoutSuccess());
    history.push('/');
  };

  // 434 ) pendingApiCall tanımladık
  const pendingApiCall = useApiProgress('put', '/api/1.0/users/' + username);

  // 451 ) validationErrors 'den displayName: displayNameError aldık
  // 454 ) image ekledik displayName -> displayNameError , image -> imageError çevirme işlemi
  const { displayName: displayNameError, image: imageError } = validationErrors;

  // 397 ) return deki html dosyasını ProfileCard'da gösterdik
  return (
    <div className="card text-center">
      <div className="card-header">
        {/** 401 ) img yerine ProfileImageWithDefault kullandık*/}
        {/**<img className="rounded-circle shadow" width="200" height="200" alt={`${username} profile`} src={imageSource} />*/}
        <ProfileImageWithDefault
          className="rounded-circle shadow"
          width="200"
          height="200"
          alt={`${username} profile`}
          image={image}
          tempimage={newImage}
        />
      </div>
      <div className="card-body">
        {/** // 413 ) inEditMode göre sonuçları belirledik */}
        {!inEditMode && (
          <>
            <h3>
              {displayName}@{username}
            </h3>
            {/** 435 ) editable ekledik (CONDITIONAL RENDERING)*/}
            {editable && (
              <>
                <button className="btn btn-success d-inline-flex" onClick={() => setInEditMode(true)}>
                  <i className="material-icons">edit</i>
                  {t('Edit')}
                </button>
                <div className="pt-2"> {/** pt-2 -> padding tab 2 */}
                  <button className="btn btn-danger d-inline-flex" onClick={() => setModalVisible(true)}>
                    <i className="material-icons">directions_run</i>
                    {t('Delete My Account')}
                  </button>
                </div>
              </>
            )}
          </>
        )}
        {inEditMode && (
          <div>
            {/** // 416 ) defaultValue Input alanına ekledik */}
            <Input
              label={t('Change Display Name')}
              defaultValue={displayName}
              onChange={event => {
                setUpdatedDisplayName(event.target.value);
              }}
              error={displayNameError}
            />
            <Input type="file" onChange={onChangeFile} error={imageError} />
            <div>
              <ButtonWithProgress
                className="btn btn-primary d-inline-flex"
                onClick={onClickSave}
                disabled={pendingApiCall}
                pendingApiCall={pendingApiCall}
                text={
                  <>
                    <i className="material-icons">save</i>
                    {t('Save')}
                  </>
                }
              />
              <button className="btn btn-light d-inline-flex ml-1" onClick={() => setInEditMode(false)} disabled={pendingApiCall}>
                <i className="material-icons">close</i>
                {t('Cancel')}
              </button>
            </div>
          </div>
        )}
      </div>
      <Modal
        visible={modalVisible}
        title={t('Delete My Account')}
        okButton={t('Delete My Account')}
        onClickCancel={onClickCancel}
        onClickOk={onClickDeleteUser}
        message={t('Are you sure to delete your account?')}
        pendingApiCall={pendingApiCallDeleteUser}
      />
    </div>
  );
};

// 210 ) ProfileCardContextWrapper tanımladık ve propları ve username yolladık
/*class ProfileCardContextWrapper extends React.Component {
    static contextType = Authentication;
    render() {
      return <ProfileCard {...this.props} username={this.context.state.username} />;
    }
}*/

// 265 ) mapStateToProps methodu store parametresiyle çağırdık
/*const mapStateToProps = store => {
  return {
    loggedInUsername: store.username
  };
};*/

// 222 ) ProfileCardContextWrapper -> ProfileCard olarak değiştirdik
//export default withRouter(ProfileCard);

// 266 ) ProfileCard mapStateToProps ile loggedInUsername alarak connect sağladık
//export default connect(mapStateToProps)(withRouter(ProfileCard));

// 333 ) ProfileCard işlemini useParams kullanarak (withRouter gerek kalmadan) export ettik
export default ProfileCard;