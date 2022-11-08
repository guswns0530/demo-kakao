import style from "../../../css/MainPage.module.css"
import {Link, useParams} from "react-router-dom";

const AddFriend = ({onClose}) => {
    const {type} = useParams()

    return (
        <div className={style.body}>
            <div id={style.add_friend_popup} className={`${style.popup} ${style.focus}`}>
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

                    <div className={style.aff_input}>
                        <input type="text" placeholder="친구 카카오톡 ID" />
                        <span className={style.counter}> 0/20 </span>
                    </div>
                    <p>카카오톡 ID를 등록하고 친구를 추가하세요.</p>

                    {/*<div className={style.aff_buttons}>*/}
                    {/*    <button className={style.active}>친구 추가</button>*/}
                    {/*</div>*/}
                    <div className={style.aff_buttons} style={{marginTop: '20px'}}>
                        <button>친구 검색</button>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default AddFriend