"use client";
import { FC, useEffect, useState } from "react";
import style from "./admin.module.scss";
import CreateWork from "./component/CreateWork/CreateWork";
import { AdminService } from "../service/admin.service";
import { IWorks } from "../interface/work.interface";
import EditWork from "./component/EditWork/EditWork";
import { IOffers } from "../interface/offer.interface";
import EditOffer from "./component/EditOffer/EditOffer";
import CreateOffer from "./component/CreateOffer/CreateOffer";
import SwiperList from "@/app/(client)/components/SwiperList";
import AddPhoto from "./component/AddPhoto/AddPhoto";

const page: FC = () => {
    const [ActivePop, SetActivePop] = useState("Works");
    const [ActivePopCreate, SetActivePopCreate] = useState(false);
    const [ActivePopEdit, SetActivePopEdit] = useState(false);
    const [ListWorks, SetListWorks] = useState<IWorks>({ works: [] });
    const [ListOffers, SetListOffers] = useState<IOffers>({ offers: [] });

    const ControlActivePopCreate = () => {
        SetActivePopCreate(!ActivePopCreate);
    };

    const ControlActivePopEdit = () => {
        SetActivePopEdit(!ActivePopEdit);
    };

    const ControlActivePop = (status: string) => {
        SetActivePop(status);
    };

    const GetData = async () => {
        switch (ActivePop) {
            case "Works":
                const works: IWorks = await AdminService.GetWorks();
                SetListWorks(works);
                break;
            case "Offers":
                const offers: IOffers = await AdminService.GetOffers();
                SetListOffers(offers);
                break;
            default:
                break;
        }
    };

    const Delete = (_id: string) => {
        switch (ActivePop) {
            case "Works":
                AdminService.DeleteWorks(_id).then(() => {
                    GetData();
                });

                break;
            case "Offers":
                AdminService.DeleteOffers(_id).then(() => {
                    GetData();
                });
            default:
                break;
        }
    };

    useEffect(() => {
        GetData();
    }, [ActivePop]);

    return (
        <>
            <aside className={style.aside__menu}>
                <h1 className={style.menu__title}>Admin Panel</h1>
                <nav className="menu">
                    <ul className={style.menu_list}>
                        <li onClick={() => ControlActivePop("Works")}>Works</li>
                        <li onClick={() => ControlActivePop("Offers")}>
                            Offers
                        </li>
                        <li onClick={() => ControlActivePop("User")}>User</li>
                    </ul>
                </nav>
            </aside>
            <main className={style.content}>
                {ActivePop === "Works" && (
                    <div className={style.content__block}>
                        <nav className={style.block__menu}>
                            <h2 className={style.block__title}>Works</h2>
                            <button
                                className={style.block__button__add}
                                onClick={ControlActivePopCreate}
                            >
                                Add Work
                            </button>
                        </nav>
                        {ActivePopCreate && ActivePop === "Works" && (
                            <CreateWork
                                SetActivePopCreate={SetActivePopCreate}
                            />
                        )}
                        <div className={style.block__list}>
                            {ListWorks.works.map((work) => (
                                <div
                                    key={work._id}
                                    className={style.block__item}
                                >
                                    <h3 className="item__title">
                                        {work.title}
                                    </h3>
                                    <nav className="item__menu">
                                        <button
                                            className={style.item__edit}
                                            onClick={ControlActivePopEdit}
                                        >
                                            <svg
                                                width="18.190430"
                                                height="18.190186"
                                                viewBox="0 0 18.1904 18.1902"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <desc>Created with Pixso.</desc>
                                                <defs />
                                                <path
                                                    id="Icon"
                                                    d="M14.0981 1.0127C14.384 0.894287 14.6907 0.833252 15.0002 0.833252C15.3098 0.833252 15.6162 0.894287 15.9021 1.0127C16.1882 1.1311 16.448 1.30469 16.6667 1.52368C16.8857 1.74243 17.0593 2.0022 17.1777 2.28833C17.2961 2.57422 17.3572 2.88086 17.3572 3.19019C17.3572 3.49976 17.2961 3.8064 17.1777 4.09229C17.0593 4.37817 16.8857 4.63818 16.6667 4.85693L5.41675 16.1069L0.833496 17.3569L2.0835 12.7737L13.3335 1.52368C13.5522 1.30469 13.8123 1.1311 14.0981 1.0127Z"
                                                    stroke="#667085"
                                                    stroke-opacity="1.000000"
                                                    stroke-width="1.666667"
                                                    stroke-linejoin="round"
                                                />
                                            </svg>
                                        </button>
                                        {ActivePopEdit && (
                                            <EditWork
                                                SetActivePopEdit={
                                                    SetActivePopEdit
                                                }
                                                work={work}
                                            />
                                        )}
                                        <button
                                            className="item__delete"
                                            onClick={() => Delete(work._id)}
                                        >
                                            <svg
                                                width="16.666504"
                                                height="18.333252"
                                                viewBox="0 0 16.6665 18.3333"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <desc>Created with Pixso.</desc>
                                                <defs />
                                                <path
                                                    id="Icon"
                                                    d="M0.833252 4.1665L2.5 4.1665L15.8333 4.1665M2.5 4.1665L14.1665 4.1665L14.1665 15.8333C14.1665 16.2754 13.991 16.6992 13.6785 17.0117C13.366 17.3242 12.9419 17.5 12.5 17.5L4.1665 17.5C3.72461 17.5 3.30054 17.3242 2.98804 17.0117C2.67554 16.6992 2.5 16.2754 2.5 15.8333L2.5 4.1665M5 4.1665L5 2.5C5 2.05786 5.17554 1.63403 5.48804 1.32129C5.80054 1.00879 6.22461 0.833252 6.6665 0.833252L10 0.833252C10.4419 0.833252 10.866 1.00879 11.1785 1.32129C11.491 1.63403 11.6665 2.05786 11.6665 2.5L11.6665 4.1665M6.6665 8.33325L6.6665 13.3333M10 8.33325L10 13.3333"
                                                    stroke="#667085"
                                                    stroke-opacity="1.000000"
                                                    stroke-width="1.666667"
                                                    stroke-linejoin="round"
                                                />
                                            </svg>
                                        </button>
                                    </nav>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {ActivePop === "Offers" && (
                    <div className="content__block">
                        <nav className="block__menu">
                            <h2 className="block__title">Offers</h2>
                            <button className="block__button__add" onClick={ControlActivePopCreate}>
                                Add Offer
                            </button>
                        </nav>
                        {ActivePopCreate && ActivePop === "Offers" && (
                            <CreateOffer
                                SetActivePopCreate={SetActivePopCreate}
                            />
                        )}
                        <div className={style.block__list}>
                            {ListOffers.offers.map((offer) => (
                                <div
                                    key={offer._id}
                                    className={style.block__item}
                                >
                                    <h3 className="item__title">
                                        {offer.title}
                                    </h3>
                                    <nav className="item__menu">
                                        <button
                                            className={style.item__edit}
                                            onClick={ControlActivePopEdit}
                                        >
                                            <svg
                                                width="18.190430"
                                                height="18.190186"
                                                viewBox="0 0 18.1904 18.1902"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <desc>Created with Pixso.</desc>
                                                <defs />
                                                <path
                                                    id="Icon"
                                                    d="M14.0981 1.0127C14.384 0.894287 14.6907 0.833252 15.0002 0.833252C15.3098 0.833252 15.6162 0.894287 15.9021 1.0127C16.1882 1.1311 16.448 1.30469 16.6667 1.52368C16.8857 1.74243 17.0593 2.0022 17.1777 2.28833C17.2961 2.57422 17.3572 2.88086 17.3572 3.19019C17.3572 3.49976 17.2961 3.8064 17.1777 4.09229C17.0593 4.37817 16.8857 4.63818 16.6667 4.85693L5.41675 16.1069L0.833496 17.3569L2.0835 12.7737L13.3335 1.52368C13.5522 1.30469 13.8123 1.1311 14.0981 1.0127Z"
                                                    stroke="#667085"
                                                    stroke-opacity="1.000000"
                                                    stroke-width="1.666667"
                                                    stroke-linejoin="round"
                                                />
                                            </svg>
                                        </button>
                                        {ActivePopEdit && (
                                            <EditOffer
                                                SetActivePopEdit={
                                                    SetActivePopEdit
                                                }
                                                offer={offer}
                                            />
                                        )}
                                        <button
                                            className="item__delete"
                                            onClick={() => Delete(offer._id)}
                                        >
                                            <svg
                                                width="16.666504"
                                                height="18.333252"
                                                viewBox="0 0 16.6665 18.3333"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <desc>Created with Pixso.</desc>
                                                <defs />
                                                <path
                                                    id="Icon"
                                                    d="M0.833252 4.1665L2.5 4.1665L15.8333 4.1665M2.5 4.1665L14.1665 4.1665L14.1665 15.8333C14.1665 16.2754 13.991 16.6992 13.6785 17.0117C13.366 17.3242 12.9419 17.5 12.5 17.5L4.1665 17.5C3.72461 17.5 3.30054 17.3242 2.98804 17.0117C2.67554 16.6992 2.5 16.2754 2.5 15.8333L2.5 4.1665M5 4.1665L5 2.5C5 2.05786 5.17554 1.63403 5.48804 1.32129C5.80054 1.00879 6.22461 0.833252 6.6665 0.833252L10 0.833252C10.4419 0.833252 10.866 1.00879 11.1785 1.32129C11.491 1.63403 11.6665 2.05786 11.6665 2.5L11.6665 4.1665M6.6665 8.33325L6.6665 13.3333M10 8.33325L10 13.3333"
                                                    stroke="#667085"
                                                    stroke-opacity="1.000000"
                                                    stroke-width="1.666667"
                                                    stroke-linejoin="round"
                                                />
                                            </svg>
                                        </button>
                                    </nav>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {ActivePop === "User" && (
                    <div className="content__block">
                        <nav className="block__menu">
                            <div className="block__title">
                                <h2>User</h2>
                            </div>
                            <div className="block__button__add" onClick={ControlActivePopCreate}>
                                Add Photo
                            </div>
                        </nav>
                        {ActivePopCreate && ActivePop === "User" && (
                            <AddPhoto
                                SetActivePopCreate={SetActivePopCreate}
                            />
                        )}
                        <div className="previw__list">
                            <SwiperList/>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
};

export default page;
