const listItem=[
    {
        label:"A Propos",
        subMenu:[
            {
                title:'À Propos',
                items:[
                    {
                        item:'Présentation',
                        lien:'/Presentation'
                    },{
                        item:'Mot Président',
                        lien:'/MotPresident'
                    },{
                        item:'Vision et Mission',
                        lien:'Vision_Mission'
                    },{
                        item:'Musée ESI',
                        lien:''
                    },{
                        item:'Annuaire',
                        lien:'/Annuaire/Administration'
                    },{
                        item:'Contact',
                        lien:'/Contact'
                    }]
            },
            {
                title:'Vie estudiantine',
                items:[
                    {
                        item:'Histoires de réussite',
                        lien:'/SuccessStories'
                    },{
                        item:'Clubs',
                        lien:'/ClubsFinal'
                    },{
                        item:'Fablab Accueil',
                        lien:'/FabLab/Accueil'
                     },
                    //,{
                    //     item:'Fablab Demande',
                    //     lien:'/FabLab/Demande_piece'
                    // }
                    // ,
                    {
                        item:'Fablab Piece',
                        lien:'/FabLab/piece'
                    },{
                        item:'Fablab Inscription',
                        lien:'/FabLab/Inscription'
                    }]
            },
        ]
        },
        {
            label:"E-Bachelier",
            subMenu:[
                {
                    title:'E-Bacheliers',
                    items:[
                        {
                            item:"Presentation",
                            lien:'/Ebachelier/Accueil'
                        },{
                            item:"Procedure d'inscription ",
                            lien:''
                        },{
                            item:"Moyennes d'acces ",
                            lien:''
                        },{
                            item:'Forum',
                            lien:'/Ebachelier/Forum',
                            // adminLink: '/Ebachelier/BachelierAdmin'
                        }]
                }
            ]
        },
            {
                label:"Etudes & académie",
                subMenu:[
                    {
                        title:'Programme',
                        items:[
                            {
                                item:'Programme',
                                lien:'/Program'
                            },{
                                item:'Master',
                                lien:''
                            },{
                                item:'Doctorats',
                                lien:''
                            },{
                                item:'Scholarships',
                                lien:''
                            },{
                                item:'Emploi du temps',
                                lien:''
                            },{
                                item:'Planning des salles ',
                                lien:''
                            }]
                    },
                    {
                        title:'Bibliotheque',
                        items:[
                            {
                                item:'Présentation',
                                lien:''
                            },{
                                item:'Catalogue',
                                lien:''
                            },{
                                item:'Emprunter un livre ',
                                lien:''
                            },{
                                item:'Services',
                                lien:''
                            }]
                    },
                ]
                },
                {
                    label:"Post-Graduation",
                    subMenu:[
                        {
                            title:'Recherche',
                            items:[
                                {
                                    item:'Presentation LMCS',
                                    lien:'/lmcs'
                                },
                                {
                                    item:'Projets LMCS',
                                    lien:'/LMCSProjects'
                                },
                                {
                                    item:'Equipes LMCS',
                                    lien:'/LMCSTeams'
                                },
                                {
                                    item:'Presentation LCSI',
                                    lien:'/lcsi'
                                },
                                {
                                    item:'Projets LCSI',
                                    lien:'/LCSIProjects'
                                },
                                {
                                    item:'Equipes LCSI',
                                    lien:'/LCSITeams'
                                }]
                        },
                        {
                            title:'Graduate',
                            items:[
                                {
                                    item:'Post graduation',
                                    lien:'/postraduation'
                                },
                                {
                                    item:'Programme',
                                    lien:''
                                },{
                                    item:'Documents',
                                    lien:''
                                },{
                                    item:'Statistiques',
                                    lien:''
                                },{
                                    item:'Inscription',
                                    lien:''
                                },{
                                    item:'Guide doctoratns',
                                    lien:''},
                                   { item:'Chercheur',
                                    lien:'/Chercheur'
                                }]
                        },
                    ]
                    },
                    {
                        label:"Partenariat & Formation",
                        subMenu:[
                            {
                                title:'Formations',
                                items:[
                                    {
                                        item:'Formation a la carte ',
                                        lien:'/CatalogueFormation'
                                    },{
                                        item:'Formation avant promotion',
                                        lien:'/AvantPromo'
                                    }]
                            },
                            {
                                title:'E-partenariat',
                                items:[
                                    {
                                        item:'Cooperation nationale',
                                        lien:''
                                    },{
                                        item:'Cooperation internationale',
                                        lien:''
                                    },{
                                        item:'Demander devis',
                                        lien:'/DemandeDevis'
                                    },{
                                        item:'Demander partenariat',
                                        lien:'/DemandePartenariatFinale'
                                    }]
                            },
                        ]
                        },
    ];
export default listItem;