import React, { useState, useEffect } from 'react';
import { getUsers } from '../api/apiCalls';
import { useTranslation } from 'react-i18next';
import UserListItem from './UserListItem';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from './Spinner';

// 364 ) UserList Component oluşturduk 
// 377 ) Component yerine Hook ile yaptık
const UserList = () => {
    const [page, setPage] = useState({
      content: [],
      size: 3,
      number: 0
    });

    // 382 ) loadFailure false olarak belirleyip , pendingApiCall sayfa çağırıldında true işlem bittinde false
    const [loadFailure, setLoadFailure] = useState(false);

    // 428 ) pendingApiCall'deki useApiProgress 'get' tanımladık
    const pendingApiCall = useApiProgress('get', '/api/1.0/users?page');

    useEffect(() => {
        // 374 )  loadUsers çağırdık
        loadUsers();
    }, []); // 378 ) , [] -> loadUser onClickNext onClickPrevious da  tek bir defa çağırmak için kullandık yoksa infinite loop

    const onClickNext = () => {
        const nextPage = page.number + 1;
        loadUsers(nextPage);
    };

    const onClickPrevious = () => {
        const previousPage = page.number - 1;
        loadUsers(previousPage);
    };

    // 383 ) loadUsers işlemini gelen page göre User yükledik.
    const loadUsers = async page => {
        setLoadFailure(false);
        try {
          const response = await getUsers(page);
          setPage(response.data);
        } catch (error) {
          setLoadFailure(true);
        }
    };

    const { t } = useTranslation();
    const { content: users, last, first } = page;

    // 384 ) actionDiv tasarladık
    let actionDiv = (
        <div>
          {first === false && (
            <button className="btn btn-sm btn-light" onClick={onClickPrevious}>
              {t('Previous')}
            </button>
          )}
          {last === false && (
            <button className="btn btn-sm btn-light float-right" onClick={onClickNext}>
              {t('Next')}
            </button>
          )}
        </div>
    );

    // 385 ) pendingApiCall durumunu kontrol ettik
    if (pendingApiCall) {
        // 407 ) Spinner.js de Spinner function component olarak tanımladığımız için buraya gerek kalmadı direk <Spinner />
        // actionDiv = (
        //   <div className="d-flex justify-content-center">
        //     <div className="spinner-border text-secondary">
        //       <span className="sr-only">Loading...</span>
        //     </div>
        //   </div>
        // );
        actionDiv = <Spinner />;
    }

  
  return (
    <div className="card">
      <h3 className="card-header text-center">{t('Users')}</h3>
      <div className="list-group-flush">
        {users.map(user => (
          <UserListItem key={user.username} user={user} />
        ))}
      </div>

      {/** 386 ) actionDiv ve Load Failure işlmenini gösterdik */}
      {actionDiv}
      {loadFailure && <div className="text-center text-danger">{t('Load Failure')}</div>}
    </div>
  );

}

export default UserList;

// 364 ) UserList Component oluşturduk
/*class UserList extends Component {
    // 365 ) user array içinde olan state tanımladık
    // 373 ) pagination özelliği user silip page ekledik
    state = {
        page: {
            content: [],
            size: 3,
            number: 0
          }
      };
    
      // render methodundan sonra çalışacak
      componentDidMount() {
        // 374 )  loadUsers çağırdık
        this.loadUsers();
      };

      loadUsers = page => {
        getUsers(page).then(response => {
          this.setState({
            page: response.data
          });
        });
      };

      // 375 ) onClickNext tanımladık
      onClickNext = () => {
        const nextPage = this.state.page.number + 1;
        this.loadUsers(nextPage);
      };
    
      // 376 ) onClickPrevious tanımladık
      onClickPrevious = () => {
        const previousPage = this.state.page.number - 1;
        this.loadUsers(previousPage);
      };
    
      // 366 ) render methodunu tanımladık
      render() {
        const { t } = this.props;
        const { content: users, last, first } = this.state.page;
        return (
          <div className="card">
            <h3 className="card-header text-center">{t('Users')}</h3>
            <div className="list-group-flush">
              {users.map(user => (
                <UserListItem key={user.username} user={user} />
              ))}
            </div>
            <div>
                {first === false && (
                    <button className="btn btn-sm btn-light" onClick={this.onClickPrevious}>
                    {t('Previous')}
                    </button>
                )}
                {last === false && (
                    <button className="btn btn-sm btn-light float-right" onClick={this.onClickNext}>
                    {t('Next')}
                    </button>
                )}
            </div>
          </div>
        );
      }
}

// 367 ) UserList diğer yerlerde kullanmak export ettik (Türkçe ingilizce işlemini için withTranslation içine yazdık)
export default withTranslation()(UserList);

*/
