import {
	IonButtons,
	IonLabel,
	IonModal,
	IonHeader,
	IonContent,
	IonToolbar,
	IonTitle,
	IonPage,
	IonItem,
	IonButton,
	IonInput, 
	IonSegment, 
	IonSegmentButton,
	useIonAlert,
	IonSelect, IonSelectOption,
	IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,IonList,IonAvatar,IonImg,IonIcon,IonActionSheet,useIonActionSheet,IonBadge,
	IonMenu,IonMenuButton,IonTabBar,IonTabButton,IonTabs,IonAlert,createAnimation,    
  } from '@ionic/react';
  import { IonDatetime, IonDatetimeButton } from '@ionic/react';
  import axios from 'axios';
  import $ from 'jquery';
  //import $ from 'jquery';
  import { personCircle } from 'ionicons/icons';
  import React, { useState, useRef, useEffect } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';
import { OverlayEventDetail } from '@ionic/core/components';
import { useHistory,useLocation } from "react-router-dom";
import img2 from '../components/loader/l4.gif';
import imges from '../components/loader/l5.gif';
const Tab3: React.FC = () => {

	const modal = useRef<HTMLIonModalElement>(null);
	const modal_stat = useRef<HTMLIonModalElement>(null);

	const modal2 = useRef<HTMLIonModalElement>(null);
	const input = useRef<HTMLIonInputElement>(null);
	const input2 = useRef<HTMLIonInputElement>(null);
	const [niveaux, setNiveaux] = useState([{nom:'',id:''}])
	const [semestre, setSemestre] = useState([{nom:'',id:'',titre:''}])
	const [show, setShow] = useState(null)
	const [show4, setShow4] = useState(null)
	const [show5, setShow5] = useState(null)
	const [show2, setShow2] = useState(null)
	const [show3, setShow3] = useState(null)
	const [show6, setShow6] = useState(false)

	const [isOpen, setIsOpen] = useState(false);
	const [isOpen_stat, setIsOpenStat] = useState(false);

	const [niveau, setNiveau] = useState('');
	const [semestres, setSemestres] = useState('');
	const [date, setDate] = useState('');
	const [ht, setHt] = useState('');
	const [nc, setNc] = useState('');
	const [heure, setHeure] = useState('');

	const [enseignants, setEnseignants] = useState([{nom:'',id:'',prenom:''}]);
	const [enseignantsA, setEnseignantsA] = useState([{"id":"","destinataire":"","date_j":"","comment":"",titre:""}]);

	const [enseignant, setEnseignant] = useState(null);
	const [imageInfos, setImageInfos] = useState([]);
	const [currentFile, setCurrentFile] = useState(undefined);
	const [previewImage, setPreviewImage] = useState(undefined);

	const [titreCour, setTitreCour] = useState('');
	const [statCour, setStatCour] = useState('');
	const [htt, setHtt] = useState('');
	const [tch, setTch] = useState('');
	const [pourcentages , setPourcentages] = useState('');
	const [loaderImg, setLoaderImg] = useState(false);

	const [zoom, setZoom] = useState(false);
	const [message, setMessage] = useState(
	  'This modal example uses triggers to automatically open a modal when the button is clicked.'
	);
	const [image, setImage] = useState('undefined')
     const [images, setImages] = useState([{image:''}])
     const [shows, setShows] = useState(false)


	 const getImage = ()=>{
		axios.get('http://127.0.0.1:8000/api/uploads/').then((response)=>{
			   console.log(response)
			   setImages(response.data.datas)
			   setShows(true)
			  })
	   }

	const [selectedFile, setSelectedFile] = React.useState(null);
	const [present] = useIonActionSheet();
	const modal_niveau = useRef<HTMLIonModalElement>(null);
	let history = useHistory();
	const handleSubmit = async(event:any) => {
		setSelectedFile(event.target.files[0])
		const formData = new FormData();
		formData.append("selectedFile", event.target.files[0]);
		try {
		  const response = await axios({
			method: "post",
			url: "http://127.0.0.1:8000/api/upload/",
			data: formData,
			headers: { "Content-Type": "multipart/form-data" },
		  });
		} catch(error) {
		  console.log(error)
		}
	  }

	  function readURL(input:any) {
		console.log(input)
		if (input.files && input.files[0]) {
	  
		  var reader = new FileReader();
	  
		  reader.onload = function(e:any) {
			$('.image-upload-wrap').hide();
	  
			$('.file-upload-image').attr('src', e.target.result);
			$('.file-upload-content').show();
	  
			$('.image-title').html(input.files[0].name);
		  };
	  
		  reader.readAsDataURL(input.files[0]);
	  
		} 
	  }

	  const handlezoom = ()=>{
		setZoom(true)
	  }

	  const handleClose = ()=>{
		setZoom(false)
		modal.current?.dismiss()
	  }

	   const handleClose_stat = ()=>{
		setIsOpenStat(false)
	  }

	  const handleClose_stat6 = ()=>{
		setShow6(false)
	  }

  function dismiss() {
    modal_niveau.current?.dismiss();
  }
  const [result, setResult] = useState<OverlayEventDetail>();
  const [nom, setNom] = useState('')
  const [titre, setTitre] = useState('')
  const [idniveau1, setidniveau] = useState('')

  const [idsemestre1, setidSemestre] = useState('')

  const [count, setCount] = useState(0)

  const [img, setImg] = useState('')
  const [fiches, setid] = useState([{"id":'',"semestre":"",status :"","UE":"","Enseignant":"","salle":"","seance":"","titre":"","cotenu":"","date":"","updated_at":"","created_at":"","niveau":"","heure_fin":"","heure_debut":"","total_horaire":null,"idcour":'',"image":''}])
  const [cours, setCours] = useState([{nom:'',titre:'',idniveau:'',idsemestre:'',id:'',enseignant:'',heure:''}])
   const [loader,setLoader] = useState(true)
		const handletitre = ()=>{
			console.log(input2.current)
		}
		const afficheFiche = ()=>{
			
		}

	useEffect(() => {
		fectcNiveaux()
		fectcSemestre()
		fectcSemestre()
		fectcEnseignants()
		fectcSemestreA()
		getImage()
		console.log(localStorage.getItem('user_ens'))
	setTimeout(()=>{
        setLoader(false)
    },10000)
	  },[])

	 const handleImg = (img:any)=>{
		setImg(img)
		setZoom(true)
	 }
  
	      const handechange = (e:any,idf:any)=>{
	   	setLoaderImg(true)
		const imageArray = []
		let isValid = '';
		  for(let i=0; i<e.target.files.length;i++){
		  imageArray.push(e.target.files[i])
		  setImage(imageArray[0])
		}
  
		let data = new FormData()
  
		console.log(idf)
	  data.append('images[]',imageArray[0])
	  
		axios.post('http://127.0.0.1:8000/api/uploads/'+idf,data).then((response)=>{
			   console.log(response)
			   handleFiche(localStorage.getItem('idatas'))
			   setLoaderImg(false)
			  })
	   }

	

	  	const handleFiche = (id:any)=>{
	  		
			axios.get('http://127.0.0.1:8000/api/fiche_suivi/'+id).then( async (response)=>{
				localStorage.setItem('idatas',id)
				setid(response.data)
				setShow3(response.data)
				setZoom(false)
				setIsOpen(true)
		})
		}

	  const handlesave = ()=>{
	  	setLoader(true)
				axios.get('http://127.0.0.1:8000/api/cour/'+nom+'/'+titre+'/'+idniveau1+'/'+idsemestre1+'/'+enseignant+'/'+date+'/'+nc+'/'+ht).then( async (response)=>{
				console.log(response)
			setLoader(false)
			modal.current?.dismiss()
		 })
	 }

	  const fetchCours= (n:any,s:any)=>{
		axios.get('http://127.0.0.1:8000/api/cours_ens/'+n+'/'+s+'/'+localStorage.getItem('user_ens')).then( async (response)=>{
			console.log(response)
			setShow4(response.data)
			setCours(response.data)
		})
	  }

	  const handleFile = (e:any)=>{
		setCurrentFile(e.target.files[0])

		//setPreviewImage(URL.revokeObjectURL(e.target.files[0]))
	  }

	function confirm() {
	  modal.current?.dismiss(input.current?.value, 'confirm');
	}
  
	function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
	  if (ev.detail.role === 'confirm') {
		setMessage(`Hello, ${ev.detail.data}!`);
	  }
	}

	const fectcNiveaux = async ()=>{
		axios.get('http://127.0.0.1:8000/api/niveau/').then( async (response)=>{
		 await setNiveaux(response.data)
		  setShow(response.data)
		})
	  }

	  const fectcSemestre = async ()=>{
		axios.get('http://127.0.0.1:8000/api/semestre/').then( async (response)=>{
		 await setSemestre(response.data)
		  setShow2(response.data)
		})
	  } 

	  const fectcSemestreA = async ()=>{
		axios.get('http://127.0.0.1:8000/api/alerte/').then( async (response)=>{
			console.log(response.data)
		 await setEnseignantsA(response.data.alert)
		 await setCount(response.data.countalert)
		  
		})
	  } 

	  const fectcEnseignants = async ()=>{
		axios.get('http://127.0.0.1:8000/api/enseignants/').then( async (response)=>{
		 await setEnseignants(response.data)
		  setShow5(response.data)
		})
	  }

	  

	  const handleItem = (idfiche:any)=>{
		//localStorage.removeItem('id')
		localStorage.setItem('idfiche',idfiche)
		console.log(idfiche)
        history.push('tata')
	  }

	   const handleAlert = async ()=>{
				
				axios.get('http://127.0.0.1:8000/api/alerte/').then( async (response)=>{
						console.log(response.data)
					 await setCount(response.data.countalert)
					 setShow6(true)
					  axios.get('http://127.0.0.1:8000/api/updateA/').then(async (response)=>{
					
		
		})
					})
	  }
 	

if(loader == true){
    return (
      <> 
				<div className="wrapper fadeInDown">
				        <div id="formContent">
				        <img src={img2} id="icon" style={{width:400}} alt="User Icon" />
				            <p style={{width:400,color:"slateblue",fontSize:20, fontFamily:"Harrington"}} >Recherche Fiche ....</p>
				        </div>
				 </div>
  </> 
      )
  }else {
    return ( 
        		<>
        		 <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu Content</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">This is the menu content.</IonContent>
      </IonMenu>
    <IonContent className="ion-padding"  style={{marginTop:20,backgroundColor:'#fff'}}>
		<div className="row">
		<div style={{display:'flex',flexDirection:'row'}} >
			<button id="" className='btn btn-outline-info mb-4' onClick={()=>handleAlert()}  style={{fontSize:20,marginLeft:200}} >
			<i className="fa fa-bell"></i>
			{count > 0 ? (<IonBadge color="danger" slot="end">{count}</IonBadge>) : null}
			
			</button>
      <button id="open-custom-dialog" className='btn btn-outline-info mb-4 text-uppercase' style={{fontSize:20,marginLeft:3,position:'absolute',top:0,marginTop:19,fontFamily:'Javanese Text'}} >choisir niveau</button>
		</div>
      
		<section className="white section">

<div className="container">
				{ show4 == null ? (<p style={{
					color:'#000080',
					fontSize:30,
					zIndex: 20,
					width: '500px',
					height: '400px',
					backgroundColor:'#fff',
					marginTop:100,
					textTransform:'uppercase'

				}} >Chargement...</p>) :  cours.map((item,i)=>{
								return  (
								
																<>
					<div className="row course-list">
<div className="col-md-4 col-sm-4 col-xs-12">

<div className="shop-item-list entry">
<div className="" onClick={() =>  present({
                                                        header: 'ACTION',
                                                        buttons: [
                                                            {
                                                              text: 'DETAIL',
                                                              role: 'destructive',
                                                              handler:()=>{
                                                            axios.get('http://127.0.0.1:8000/api/fiche_suivi/'+item.id).then( async (response)=>{
                                                                                    localStorage.setItem('idatas',item.id)
                                                                                    setid(response.data)
                                                                                    setShow3(response.data)
                                                                                    setZoom(false)
                                                                                    setIsOpen(true)
                                                                        })
                                                              }
                                                            },
                                                            {
                                                              text: 'STATS',
                                                              role: 'destructive',
                                                              handler:()=>{
                                                              	setTitreCour(item.nom)
                                                              	setHtt(item.heure)
                                                              	axios.get('http://127.0.0.1:8000/api/stat_cour/'+item.id).then( async (response)=>{
                                                                              setStatCour(response.data.statcour) 
                                                                              setTch(response.data.pfin) 
                                                                              setPourcentages(response.data.pourcentages) 
                                                                        })
                                                            		setIsOpenStat(true)
                                                              }
                                                            },
                                                            {
                                                              text: 'SUPPRIMER',
                                                              role: 'destructive',
                                                              handler:()=>{
                                                                  axios.get('http://127.0.0.1:8000/api/delete/'+item.id).then((response)=>{
                                                                        console.log(response)
                                                                        fetchCours(localStorage.getItem('n'),localStorage.getItem('s'))
                                                                     })
                                                              }
                                                            },
                                                            {
                                                              text: 'FERMER',
                                                              role: 'cancel',
                                                              data: {
                                                                  action: 'cancel',
                                                              },
                                                            },
                                                        ],
                                                        onDidDismiss: ({ detail }) => setResult(detail),
                                                      })
                                                  }>
<img src="upload/xservice_02.png.pagespeed.ic.c6RThoxSWC.png"  alt=""/>
																			<div className="magnifier">
																			</div>
																			</div>
																			</div>

																			</div>
																			<div className="col-md-8 col-md-8">
																			<div className="shop-list-desc">
																			<h4><a href="course-single.html text-uppercase" style={{color:'#13005e',fontSize:25,textTransform: "uppercase"}}>{item.nom}</a></h4>
																			<div className="shopmeta">
																			<span className="pull-left" style={{color:'#0078d7',fontSize:20,fontFamily: 'Times New Roman'}} ><strong>SEMESTRE : </strong>{item.idsemestre}</span><br />
																			<span className="pull-left" style={{color:'#0078d7',fontSize:20,fontFamily: 'Times New Roman'}}><strong>NIVEAU : </strong>{item.idniveau}</span><br />
																			<span className="pull-left" style={{color:'#0078d7',fontSize:20,fontFamily: 'Times New Roman'}}><strong>ENSEIGNANT : </strong>{item.enseignant}</span><br />
																			<span className="pull-left" style={{color:'#0078d7',fontSize:20,fontFamily: 'Times New Roman'}}><strong>TOTAL HEURE  : </strong>{item.heure}</span>
																			<div className="rating pull-right">
																				<p style={{color:'#003f13',fontSize:20}} >{item.titre}</p>
																			</div>
																			</div>
																			<hr className=""/>
																		
																			</div>
																			</div>
																			</div>

<hr style={{border:"1px solid #003f13"}} className=""/>
</>

								)
								})}
					
				</div>
		</section>
		</div>

		<IonModal ref={modal} trigger="open-modal" onWillDismiss={(ev) => onWillDismiss(ev)}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => handleClose()}>Cancel</IonButton>
              </IonButtons>
              <IonTitle>Welcome</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm()}>
                  Confirm
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
		  <div style={{display:'flex',flexDirection:'row'}} >
		  <div className='form-group mr-4' style={{width:'50%'}} >
                  <input type='text'  className='form-control border-top-0 border-left-0 border-right-0 border-bottom-info' onChange={e => setNom(e.target.value)}  placeholder='nom' value={nom} />
              </div>

			<div className='form-group mr-4' style={{width:'50%'}} >
                  <input type='text'  className='form-control border-top-0 border-left-0 border-right-0 border-bottom-info' onChange={e => setTitre(e.target.value)}  placeholder='titre' value={titre} />
              </div>
			  
		  </div>

			<IonItem>
				<IonSelect onIonChange={(e)=>{setidniveau(e.detail.value)}}  aria-label="fruit" placeholder="Select niveaux">
				{ show == null ? (<p>Chargement...</p>) :  niveaux.map((item,i)=>{
							return  (
							<IonSelectOption value={item.nom}>{item.nom}</IonSelectOption>
							)
							})}
				</IonSelect>

			</IonItem>

			<IonItem style={{marginTop:10}}>
				<IonSelect  onIonChange={(e)=>{setidSemestre(e.detail.value)}}  aria-label="fruit" placeholder="Select semestre">
				{ show2 == null ? (<p>Chargement...</p>) :  semestre.map((item,i)=>{
							return  (
							<IonSelectOption value={item.nom}>{item.titre}</IonSelectOption>
							)
							})}
				</IonSelect>

			</IonItem>

			<IonItem style={{marginTop:10}}>
				<IonSelect  onIonChange={(e)=>{setEnseignant(e.detail.value)}}  aria-label="fruit" placeholder="Select enseignant">
				{ show5 == null ? (<p>Chargement...</p>) :  enseignants.map((item,i)=>{
							return  (
							<IonSelectOption value={item.nom}>{item.nom} {item.prenom}</IonSelectOption>
							)
							})}
				</IonSelect>

			</IonItem>

			<IonItem style={{marginTop:10,display:'flex',flexDirection:'row', justifyContent:'space-around' }}>
				<div style={{width:'100%'}} >
					<input type='date' onChange={(e)=>{setDate(e.target.value)}} value={date} className='form-control' placeholder='date' />
				</div>
			</IonItem>

			<IonItem style={{marginTop:10}}>
					<input type='number' onChange={(e)=>{setHt(e.target.value)}} value={ht} className='form-control' placeholder='total horaire' />

			</IonItem>

			<IonItem style={{marginTop:10}}>
					<input type='number' onChange={(e)=>{setNc(e.target.value)}} value={nc} className='form-control' placeholder='nombre chapitre' />

			</IonItem>

			<IonButton onClick={handlesave} style={{marginTop:70}} expand="full">SAVE</IonButton>
          </IonContent>
        </IonModal>

		


		<IonModal isOpen={isOpen}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Modal</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
		  {
			zoom ? (
			<>
			<span style={{
				color:'darkgreen',
				fontSize:30,
				position:'absolute',
				top:'50%',
				left:'50%',
				zIndex:1000
			}} 
			className='ml-4' 
			onClick={()=>{setZoom(false)}} > 
			<i className="fa fa-search-minus"></i> 
			</span>
			
			<img alt="Silhouette of mountains" 
			style={{transform: 'scale(1) translate(20px)',height:'100%',width:'100%'}} 
			className="file-upload-image" src={img} />
			</>
			) : 
			(
				<IonContent className=""> 
				<section className="white section">
				<div className="container">
				{ show3 == null ? (<p style={{
					color:'#000080',
					fontSize:30,
					zIndex: 20,
					width: '500px',
					height: '400px',
					backgroundColor:'#fff',
					marginTop:100,
					textTransform:'uppercase'

				}} >Chargement...</p>) : fiches.map((item,i)=>{
                                   return   (
                 <>
										<div className="row course-list">
<div className="col-md-4 col-sm-4 col-xs-12">

<div className="shop-item-list entry">
<div className="" onClick={() =>
                                                      present({
                                                        header: 'ACTION',
                                                        buttons: [
                                                            {
                                                              text: 'DETAIL',
                                                              role: 'destructive',
                                                              handler:()=>{
                                                                  handleItem(item.id)
                                                              }
                                                            },
                                                            
                                                            {
                                                              text: 'VALIDER FICHE ',
                                                              role: 'destructive',
                                                              handler:()=>{
                                                                 handleItem(item.id)
                                                              }
                                                            },
                                                            {
                                                              text: 'FERMER',
                                                              role: 'cancel',
                                                              data: {
                                                                  action: 'cancel',
                                                              },
                                                            },
                                                        ],
                                                        onDidDismiss: ({ detail }) => setResult(detail),
                                                      })
                                                  } >
       {
        shows ? (
           <img alt="" 
           style={{width:"200%",height:"200px"}}
            src={loaderImg ? imges :'http://127.0.0.1:8000/uploads/'+item.image}  />) : 
             (<img alt="" src="upload/xcourse_01.png.pagespeed.ic.XTOvCuUmZu.png" />)
      }
<div className="magnifier">
</div>
</div>
</div>

</div>
<div className="col-md-8 col-md-8">
<div className="shop-list-desc">
<h4><a href="" style={{textTransform:"uppercase"}} >{item.UE}</a></h4>
<div className="shopmeta">
<span style={{color:'#0078d7',fontSize:15,fontFamily: 'Times New Roman'}} className="pull-left">
		<strong>SALLE : </strong> {item.salle} 
		<strong> SEANCE : </strong> {item.seance} 
		<strong> NIVEAUX : </strong> {item.niveau}
		</span>
	<br/>
<span style={{color:'#0078d7',fontSize:15,fontFamily: 'Times New Roman'}} className="pull-left">
		<strong> HEURE DEBUT : </strong> {item.heure_debut} 
		<strong> HEURE FIN : </strong> {item.heure_fin} 	<br/>
		<strong> DATE : </strong> {item.date}
		<strong> TOTAL HORAIRES  : </strong> {item.total_horaire}
		</span>
	<br/>
<div className="rating pull-right">
    <p style={{color:'#0078d7',fontSize:20,fontFamily: 'Times New Roman'}} >{item.titre}</p>
</div>
</div>

<label style={{color:'#0078d7',fontSize:20,fontFamily: 'Times New Roman'}} htmlFor={'file'+item.id} >Changer images  </label>
 <input type='file' onChange={(e)=>{handechange(e,item.id)}} id={'file'+item.id} style={{display:'none'}} />
</div>
</div>
</div>
 <hr style={{border:"1px solid #003f13"}} className="invis clearfix"/>
 </>
                                   )
                                })
                            }
                      </div>
						</section>
			</IonContent>
			)
		  }
            
        </IonModal>


		<IonModal style={{backgroundColor:'#fff'}}  isOpen={true} ref={modal_niveau} trigger="open-custom-dialog">
          <div className="wrapper" style={{backgroundColor:'#fff',}}>
            <h1> CHOISIR UN  NIVEAUX</h1>
        
            <IonList id="open-action-sheet" lines="none" style={{backgroundColor:'#fff',width:'100%',height:''}}>
              <IonItem button={true} detail={false} onClick={dismiss}>
                <IonIcon style={{width:60,height:60}} icon={personCircle}></IonIcon>
                <IonButton    onClick={() =>
          present({
            header: 'choisir semestre',
            buttons: [
              {
                text: 'SEMESTRE 1',
                role: 'destructive',
				handler:()=>{
					localStorage.setItem('n','L1')
					localStorage.setItem('s','S1')
					fetchCours('L1','S1')
				}
              },
              {
                text: 'SEMESTRE 2',
                handler:()=>{
					localStorage.setItem('n','L1')
					localStorage.setItem('s','S2')
					fetchCours('L1','S2')
				}
              },
              {
                text: 'Cancel',
                role: 'cancel',
                data: {
                  action: 'cancel',
                },
              },
            ],
            onDidDismiss: ({ detail }) => setResult(detail),
          })
        } style={{fontSize:25}}  >NIVEAU 1</IonButton>
              </IonItem>
              <IonItem button={true} detail={false} onClick={dismiss}>
                <IonIcon style={{width:60,height:60}} icon={personCircle}></IonIcon>
                <IonButton onClick={() =>
          present({
            header: 'choisir semestre',
            buttons: [
              {
                text: 'SEMESTRE 1',
                role: 'destructive',
				handler:()=>{
					localStorage.setItem('n','L2')
					localStorage.setItem('s','S1')
					fetchCours('L2','S1')
				}
              },
              {
                text: 'SEMESTRE 2',
                handler:()=>{
					localStorage.setItem('n','L2')
					localStorage.setItem('s','S2')
					fetchCours('L2','S2')
				}
              },
              {
                text: 'Cancel',
                role: 'cancel',
                data: {
                  action: 'cancel',
                },
              },
            ],
            onDidDismiss: ({ detail }) => setResult(detail),
          })
        } style={{fontSize:25}} >NIVEAU 2</IonButton>
              </IonItem>
              <IonItem button={true} detail={false} onClick={dismiss}>
                <IonIcon style={{width:60,height:60}} icon={personCircle}></IonIcon>
                <IonButton onClick={() =>
          present({
            header: 'choisir semestre',
            buttons: [
              {
                text: 'SEMESTRE 1',
                role: 'destructive',
				handler:()=>{
					localStorage.setItem('n','L3')
					localStorage.setItem('s','S1')
					fetchCours('L3','S1')
				}
              },
              {
                text: 'SEMESTRE 2',
                handler:()=>{
					localStorage.setItem('n','L3')
					localStorage.setItem('s','S2')
					fetchCours('L3','S2')
				}
              },
              {
                text: 'Cancel',
                role: 'cancel',
                data: {
                  action: 'cancel',
                },
              },
            ],
            onDidDismiss: ({ detail }) => setResult(detail),
          })
        } style={{fontSize:25}} >NIVEAU 3</IonButton>
              </IonItem>
			  <IonItem button={true} detail={false} onClick={dismiss}>
                <IonIcon style={{width:60,height:60}} icon={personCircle}></IonIcon>
                <IonButton onClick={() =>
          present({
            header: 'choisir semestre',
            
            buttons: [
              {
                text: 'SEMESTRE 1',
                role: 'destructive',
				handler:()=>{
					localStorage.setItem('n','M1')
					localStorage.setItem('s','S1')
					fetchCours('M1','S1')
				}
              },
              {
                text: 'SEMESTRE 2',
                handler:()=>{
					localStorage.setItem('n','M1')
					localStorage.setItem('s','S2')
					fetchCours('M1','S2')
				}
              },
              {
                text: 'Cancel',
                role: 'cancel',
                data: {
                  action: 'cancel',
                },
              },
            ],
            onDidDismiss: ({ detail }) => setResult(detail),
          })
        } style={{fontSize:25}} >MASTER 1</IonButton>
              </IonItem>
			  <IonItem button={true} detail={false} onClick={dismiss}>
                <IonIcon style={{width:60,height:60}} icon={personCircle}></IonIcon>
                <IonButton onClick={() =>
          present({
            header: 'Example header',
            subHeader: 'Example subheader',
            buttons: [
              {
                text: 'SEMESTRE 1',
                role: 'destructive',
				handler:()=>{
					localStorage.setItem('n','M2')
					localStorage.setItem('s','S1')
					fetchCours('M2','S1')
				}
              },
              {
                text: 'SEMESTRE 2',
                handler:()=>{
					localStorage.setItem('n','M2')
					localStorage.setItem('s','S2')
					fetchCours('M2','S2')
				}
              },
              {
                text: 'Cancel', 
                role: 'cancel',
                data: {
                  action: 'cancel',
                },
              },
            ],
            onDidDismiss: ({ detail }) => setResult(detail),
          })
        } style={{fontSize:25}} >MASTER 2</IonButton>
              </IonItem>
            </IonList>
          </div>
        </IonModal>
	</IonContent>
	

			<IonModal isOpen={isOpen_stat}  onWillDismiss={(ev) => onWillDismiss(ev)}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => handleClose_stat()}>FERMER</IonButton>
              </IonButtons>
              <IonTitle></IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm()}>
                  STATS
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
		 					<div className="col-md-12 white section">
								<div className="content-widget">
								<div className="widget-title">
								   <h4>Cour {titreCour}</h4>
								<hr/>
								</div>
								<table className="table table-bordered">
								<thead>
								<tr>
								<th>
								#
								</th>
								<th>
								total fiches
								</th>
								<th>
								chapitre fini
								</th>
								<th>
								% cour {titreCour}
								</th>
								</tr>
								</thead>
								<tbody>
								<tr>
								<td>
								1
								</td>
								<td>
								{statCour}
								</td>
								<td>
								{tch +'/'+ htt}
								</td>
								<td>
								<div className="col-md-8">
											<div className="className">
											<span> {pourcentages}%</span>
											<div className="progress">
											<div className="progress-bar" role="progressbar" style={{width: pourcentages+"%"}} >
											</div>
											</div>
										</div>
									</div>
								</td>
								</tr>


								</tbody>
								</table>
								</div>
								</div>
          </IonContent>
        </IonModal>


       <IonModal isOpen={show6}  onWillDismiss={(ev) => onWillDismiss(ev)}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => handleClose_stat6()}>FERMER</IonButton>
              </IonButtons>
              <IonTitle></IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm()}>
                  Alert
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="white section">
		 					<div className="course-table " style={{width:'100%'}} >
							<h4 style={{color:'#fff'}} >Recents</h4>
							<table className="table table-bordered table-responsive">
							<thead>
							<tr style={{color:'#fff'}} >
							<th style={{color:'#fff'}} >Titre </th>
							<th style={{color:'#fff'}} >Contenu </th>
							<th style={{color:'#fff'}} >date</th>
							<th style={{color:'#fff'}} >Status</th>
							</tr>
							</thead>
							<tbody>
							{
								enseignantsA.map((item) => {
									return (
											<tr>
													<td style={{color:'#fff'}} >{item.titre}</td>
													<td style={{color:'#fff'}} ><a style={{color:'#fff'}} href="">{item.comment}</a></td>
													<td style={{color:'#fff'}} >{item.date_j}</td>
											</tr>
									)
								})
							}
							
							
							</tbody>
							</table>
							</div>
          </IonContent>
        </IonModal>
			     
      
	</>
 )
    
  }

};

export default Tab3;


			