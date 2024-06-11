import React from 'react'
import labo from '../../assets/images/laboInfo.svg'
import book from '../../assets/images/bookInfo.svg'
import alumni from '../../assets/images/alumniInfo.svg'
import student from '../../assets/images/studentInfo.svg'
import partenariat from '../../assets/images/partenariat.svg'
import formation from '../../assets/images/formation.svg'
import './QuickFact.css'

function QuickFact () {
  return (
    <div className='TotaleQuickFact'>
      <div className='QuickFactTitre'>Saviez vous que ...?</div>
      <hr className="hr-line"/>
      <div className='quickFactFull-container'>
        <div className='quickFact-title'></div>
        <div className='quickFact-container'>
          <div className='quickFact-FullSect1'>
            <div className='quickFact-section1'>
              <div className='quickFactCompo'>
                <div className='quickFactNbr'>2</div>
                <div className='square2'></div>
                <hr className='hrL1'/>
                <div className='quickFactCercle'>
                    <div className='square1'></div>
                    <hr className='hr1'/>
                    <div className='quickFactC1'>
                      <div className='quickFactC2'>
                        <img src={labo} alt='' className='quickFactImg'></img>
                      </div>
                      <div className='quickFactC3'> </div>
                      <div className='quickFactC4'></div>
                    </div>
                    <hr className='hr2'/>
                </div>
                <hr className='hrL'/>
                <div className='square2'></div>
                <div className='quickFactWord'>Laboratoires</div>
              </div>
              <div className='quickFactCompo'>
                <div className='quickFactNbr2'>4</div>
                <div className='square22'></div>
                <hr className='hrL11'/>
                <div className='quickFactCercle'>
                    <hr className='hr11'/>
                    <div className='quickFactC1'>
                      <div className='quickFactC2'>
                        <img src={book} alt='' className='quickFactImg'></img>
                      </div>
                      <div className='quickFactC3'> </div>
                      <div className='quickFactC4'></div>
                    </div>
                    <hr className='hr2'/>
                </div>
                <hr className='hrLL'/>
                <div className='square22'></div>
                <div className='quickFactWord'>Spécialités</div>
              </div>
              <div className='quickFactCompoMul'>
                <hr className='Vr1'/>
                <div className='quickFactCompoMulS1'>
                <div className='quickFactCompo1'>
                  <div className='square22M'></div>
                    <div className='quickFactCercle'>
                      <hr className='hrM11'/>
                      <div className='quickFactC1'>
                        <div className='quickFactC2'>
                          <img src={student} alt='' className='quickFactImg'></img>
                        </div>
                        <div className='quickFactC3'> </div>
                        <div className='quickFactC4M'></div>
                      </div>
                      <hr className='hrM2'/>
                      <div className='square1'></div>
                      <div className='QFTtile2 roboto'><div className='QFSpan'>1.2K. +</div>Etudiants</div>
                  </div>
                </div>
                <div className='quickFactCompo1'>
                  <div className='square23M'></div>
                  <div className='quickFactCercle'>
                      <hr className='hrM12'/>
                      <div className='quickFactC1'>
                        <div className='quickFactC2'>
                          <img src={alumni} alt='' className='quickFactImg'></img>
                        </div>
                        <div className='quickFactC3'> </div>
                        <div className='quickFactC4M'></div>
                      </div>
                      <hr className='hrM2'/>
                      <div className='square12'></div>
                      <div className='QFTtile roboto'><div className='QFSpan'>8.3K. +</div>Diplomés</div>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
          <div className='quickFactFull-section2'>
            <div className='quickFact-section2'>
              <div className='QF-div1'>
                <div className='QFImgContainer right'><img src={partenariat} alt='' className='QFImg'></img></div>
                <div className='QFPartenCont roboto'><div className='QF-span'>50 +</div>Partenariats avec des institutions internationaux</div>
              </div>
              <hr className='QFhr1'/>
              <div className='QF-div2'>
                <div className='QFDiv21'></div>
                <hr className='QFhrI'/>
                <div className='QFDiv22'></div>
              </div>
              <hr className='QFhr2'/>
              <div className='QF-div3'>
                <div className='QFImgContainer left'><img src={formation} alt='' className='QFImg'></img></div>
                <div className='QFPartenCont1 roboto'><div className='QF-span'>30 +</div>Formations</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuickFact