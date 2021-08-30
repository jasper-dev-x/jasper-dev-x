import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { apiGetAllAccounts, apiUpdateAccount, updateAccount, apiDeleteAccount, deleteAccount, initAccounts } from '../../reduxPie/accountSlice';
import FormName from './components/FormName';
import FormEmail from './components/FormEmail';
import FormPhone from './components/FormPhone';

export default function AccountList() {
    const mode = useSelector(state => state.mode);
    const accounts = useSelector((state) => state.accounts);
    const dispatch = useDispatch();
    const [oid, setOid] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState({ a: '', b: '', c: '' });
    const [email, setEmail] = useState('');
    const minHeight = `88vh`;
    const XY = 30;
    const fill = () => mode.bg === 'light' ? 'black' : 'white';

    useEffect(() => {
        dispatch(initAccounts());
        dispatch(apiGetAllAccounts());
    }, [dispatch]);

    function setEditAccount({ _id, name, email, phone }) {
        setOid(_id.$oid ? _id.$oid : "reload");
        setName(name ? name : '');
        setPhone(phone ? {
            a: phone.$numberLong.slice(0, 3),
            b: phone.$numberLong.slice(3, 6),
            c: phone.$numberLong.slice(6)
        } : '0000000000');
        setEmail(email ? email : '');
    }

    const onUpdateAccount = () => {
        const account = {
            _id: oid,
            name,
            email,
            phone: phone.a + phone.b + phone.c
        };
        dispatch(updateAccount(account));
        dispatch(apiUpdateAccount(account));
    };

    const onDeleteAccount = (_id) => {
        dispatch(apiDeleteAccount({ _id }));
        dispatch(deleteAccount({ _id }));
    };

    if (accounts.isLoading)
        return (
            <div className="d-flex flex-fill centered" style={ { minHeight } }>
                <h1 className={ `display-6 text-${mode.txt} txtJasper` }>Loading...</h1>
            </div>
        );
    else
        return (
            <div className="container" style={ { minHeight } }>
                <div className="d-flex centered w-100 p-4">
                    <h1 id="topOfScreen" className="txtJasper display-4 flex-grow-1">Accounts</h1>
                    <Link to="/accounts/create">
                        <svg xmlns="http://www.w3.org/2000/svg" width={ XY } height={ XY } fill={ fill() } className="bi bi-person-plus" viewBox="0 0 16 16">
                            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                            <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                        </svg>
                    </Link>
                </div>
                <div id="accountList" className="accordion overflow-auto px-2 pb-3 bgRed shadow rounded" style={ { height: `60vh` } }>

                    {/* ACCOUNT LIST */ }
                    { accounts.data.map((item, key) => (
                        <div key={ key } className="accordion-item bgRed mx-3 mt-3">
                            {/* ACCORDION BUTTON */ }
                            <div className="accordion-header d-grid rounded">
                                <div className="btn-group">
                                    <button className={ `btn btn-${mode.bg} text-${mode.txt} py-3 collapsed` } data-bs-toggle="collapse" data-bs-target={ `#account${key}` } aria-expanded="false" aria-controls={ `account${key}` }>
                                        <span className="lead">{ item.name }</span>
                                        <span className="dropdown-toggle ms-5" />
                                    </button>
                                </div>
                            </div>
                            <div id={ `account${key}` } className={ `accordion collapse bg-${mode.bg}` } data-bs-parent="#accountList">
                                <div className="accordion-body">
                                    <div className="d-grid flex-fill">
                                        {/* VIEW DETAILS BUTTON */ }
                                        <button className={ `btn btn-${mode.txt} mb-3` } onClick={ () => setEditAccount(item) } data-bs-toggle="modal" data-bs-target={ `#editAccountPopup${key}` } data-bs-keyboard="false">View Details</button>

                                        {/* DELETE BUTTON */ }
                                        <button className="btn btn-secondary" onClick={ () => setEditAccount(item) } data-bs-toggle="modal" data-bs-target={ `#deleteAccountPopup${key}` }>Delete Account</button>

                                        {/* VIEW DETAILS POP-UP */ }
                                        <div id={ `editAccountPopup${key}` } className="modal fade" data-bs-backdrop="static">
                                            <div className="modal-dialog modal-dialog-centered">
                                                <div className={ `modal-content bg-${mode.bg} text-${mode.txt}` }>
                                                    <div className="modal-body d-flex justify-content-between">
                                                        <h1 className="display-6">{ item.name }</h1>
                                                        <button className="btn btn-close bg-light" data-bs-dismiss="modal" />
                                                    </div>
                                                    <div className="modal-body">
                                                        <FormName count={ key } name={ name } setName={ setName } />
                                                        <FormEmail count={ key } email={ email } setEmail={ setEmail } />
                                                        <FormPhone count={ key } phone={ phone } setPhone={ setPhone } />
                                                    </div>
                                                    <div className="modal-body">
                                                        <div className="d-grid flex-fill">
                                                            <button className={ `btn btn-${mode.txt} mb-2` } onClick={ () => onUpdateAccount() } data-bs-dismiss="modal">Save</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* DELETE POP-UP */ }
                                        <div id={ `deleteAccountPopup${key}` } className="modal fade" data-bs-backdrop="static">
                                            <div className="modal-dialog modal-dialog-centered">
                                                <div className={ `modal-content bg-${mode.bg} text-center` }>
                                                    <div className="modal-body">
                                                        <h1 className={ `display-5 text-${mode.txt}` }>Are you sure?</h1>
                                                    </div>
                                                    <div className="modal-body lead fw-bold text-danger">
                                                        <p>This is a *PERMANENT* account removal of:</p>
                                                        <p className="display-6">{ name }</p>
                                                    </div>
                                                    <div className="modal-body">
                                                        <div className="d-flex flex-fill">
                                                            <div className="col d-grid">
                                                                <button className="btn btn-danger" data-bs-dismiss="modal" onClick={ () => onDeleteAccount(item._id) }>Delete</button>
                                                            </div>
                                                            <div className="col-1" />
                                                            <div className="col d-grid">
                                                                <button className={ `btn btn-${mode.txt}` } data-bs-dismiss="modal">Cancel</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) }
                </div>
            </div >
        );
};