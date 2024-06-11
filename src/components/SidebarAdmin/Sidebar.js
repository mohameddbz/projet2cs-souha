import { faChartLine, faClockRotateLeft, faHourglassHalf, faListCheck, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import { faCircleQuestion, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './sidebar.css'

function Sidebar () {
    const SidebarItems = [
        {
            categorie:'Main Boards',
            items:[{
                icon : faChartLine,
                label:'Dashboard'
            }]
        },
        {
            categorie:'Publication',
            items:[
                {
                    icon : faListCheck,
                    label:'Publications'
                },
                {
                    icon : faHourglassHalf,
                    label:'Publication en attente'
                },
                {
                    icon : faTrashCan,
                    label:'Demandes Supression'
                },
                {
                    icon : faClockRotateLeft,
                    label:'Historique de publication'
                },
            ] 
        },
        {
            categorie:'Settings',
            items:[
                {
                    icon : faTriangleExclamation,
                    label:'Report a problem'
                },
                {
                    icon : faCircleQuestion,
                    label:'Help guide'
                }
            ] 
        },
    ]
    const [navSmallSize, setNavSmallSize] = useState(false);
    const [openMenuSmallNav, setOpenMenuSmallNav] = useState(false);
    const [isActive,setIsActive] = useState(null);
    useEffect(() => {
        const handleResize = () => {
          setNavSmallSize(window.innerWidth < 920);
        };
    
        handleResize();
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
    return (
        <div className='SidebarFullContainer'>
            <div className='SidebarContainer'>
                <ul className='SidebarList'>
                    {
                        SidebarItems.map((item, index) => {
                            return (
                                <li key={index} className='SidebarListItem'>
                                    <div className='SidebarListTitle'>{item.categorie}</div>
                                    <div className='SidebarList'>
                                        {
                                            item.items.map((item, index) =>{
                                                return(
                                                    <div key={index} className={isActive !== null && isActive === index ?'SidebarListSubItem active':'SidebarListSubItem'} onClick={setIsActive(index)}>
                                                        <FontAwesomeIcon icon={item.icon} className='SidebarListItemIcon' />
                                                        <span className='SidebarListItemText'>{item.label}</span>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Sidebar