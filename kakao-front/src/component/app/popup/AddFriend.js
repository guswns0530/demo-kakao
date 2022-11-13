import style from "../../../css/MainPage.module.css"
import {Link, useParams} from "react-router-dom";
import ProfileImage from "../../util/ProfileImage";

function buttonSwitch(data, onClick, user, able) {
    if (data?.data?.data?.email === user?.email) {
        return <button className={style.active}>나와의 채팅</button>
    }
    switch (data.data.data['friend_status']) {
        case 'NONE' :
            return <button onClick={onClick} className={`${style.active} ${able && style.disable}`}>친구 추가</button>
        case 'BLOCK' :
            return <button onClick={onClick} className={`${style.active} ${able && style.disable}`}>차단해제 및 추가</button>
        case 'REMOVE' :
            return <button onClick={onClick} className={`${style.active} ${able && style.disable}`}>친구 추가</button>
        case 'FRIEND' :
            return <button className={`${style.active} ${able && style.disable}`}>채팅하기</button>
        default :
            return <button className={`${style.disable} ${able && style.disable}`}>error</button>
    }
}

const AddFriend = ({
                       onClose,
                       onChange,
                       id,
                       onSubmit,
                       isLoadingSearch,
                       data,
                       error,
                       onClick,
                       user,
                       isLoadingInsertFriend
                   }) => {
    const {type} = useParams()

    return (<div id={style.add_friend_popup} className={`${style.popup} ${style.focus}`}>
            <div className={style.tab}>
                <div className={style.exit} onClick={onClose}>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <header>친구 추가</header>
            <section>
                <nav>
                    <ul>
                        <li className={type === 'id' ? style.select : ''}>
                            <Link to={"../add-friend/id"}>ID로 추가</Link>
                        </li>
                        <li className={type === 'email' ? style.select : ''}>
                            <Link to={"../add-friend/email"} status={1}>이메일로 추가</Link>
                        </li>
                    </ul>
                </nav>

                <form onSubmit={onSubmit}>
                    <div className={style.aff_input}>
                        {type === 'id' && <input type="text" placeholder='친구 카카오톡 ID' onChange={onChange} value={id}
                                                 disabled={isLoadingSearch || isLoadingInsertFriend}/>}
                        {type === 'email' && <input type="text" placeholder='친구 카카오톡 이메일' onChange={onChange} value={id}
                                                    disabled={isLoadingSearch || isLoadingInsertFriend}/>}
                        <span className={style.counter}> {id.length}/{type === 'id' ? 20 : 40} </span>
                        {(!data && !error) && <p>카카오톡 ID를 등록하고 친구를 추가하세요.</p>}
                    </div>
                    <div className={style.aff_profile}>
                        {data && (<>
                            <div className={style.image}>
                                <ProfileImage profile_image_url={data.data.data.profile_image_url}/>
                            </div>
                            <div className={style.name}>{data.data.data.name}</div>
                            <div className={style.info}>{data.data.data.message}</div>
                        </>)}

                        {error && (<>
                            <div className={style.name}>'{id}'를 찾을 수 없습니다.</div>
                            <div className={style.error_info}>입력하신 아이디로 등록한 회원이 없습니다.</div>
                        </>)}

                    </div>
                    <div className={style.aff_buttons}>
                        {data ? buttonSwitch(data, onClick, user, isLoadingInsertFriend || isLoadingSearch) :
                            <button>친구 검색</button>}
                    </div>
                </form>
            </section>
        </div>)
}

export default AddFriend