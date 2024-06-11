import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import cn from "classnames";
import styles from "./DetailsPgme.module.scss"
import Chatbot from "../../components/chatbot/Chatbot";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/Footer/Footer";
import Select from 'react-select';
import ModuleComponent from "./ModuleComponent";
import MUIDataTable from "mui-datatables";


const optionCoef = [
    { value: 1, label: 1 },
    { value: 2, label: 2},
    { value: 3, label: 3 },
    { value: 3, label: 4 },
    { value: 3, label: 5 },
  ];

  const optionDomaine = [
    { value: '1', label: 'Ingenieurie des logiciels' },
    { value: '2', label: 'Systemes d\'information' },
    { value: '3', label: 'Infrastructure' },
    { value: '4', label: 'Systemes d\'exploitation' },
    { value: '5', label: 'Sciences de donnees' },
  ];

  const optionSpecialite = [
    { value: '1', label: 'SIT' },
    { value: '2', label: 'SIL' },
    { value: '3', label: 'SID' },
    { value: '4', label: 'SIQ' },
  ];




function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

const columns = [
    // ... (other columns)
    {name: "Code",
    label: <div style={{ fontFamily: "Segoe UI", fontSize: 15, color: '#007BFF'}}>Code</div>,
    options: {
      filter: true,
      sort: true,
      search: true, // Enable search for this column
      customBodyRender: (value, tableMeta, updateValue) => {
        return StyleData(value);
      },
    },
  },
  {
    name: "Specilite",
    label: <div style={{ fontFamily: "Segoe UI", fontSize: 15, color: '#007BFF'}}>Specilite</div>,
    options: {
      filter: true,
      sort: true,
      search: true, // Enable search for this column
      customBodyRender: (value, tableMeta, updateValue) => {
        return StyleData(value);
      },
    },
  },
  {
    name: "Titre",
    label: <div style={{ fontFamily: "Segoe UI", fontSize: 15, color: '#007BFF'}}>Titre</div>,
    options: {
      filter: true,
      sort: true,
      search: true, // Enable search for this column
      customBodyRender: (value, tableMeta, updateValue) => {
        return StyleData(value);
      },
    },
  },
  {
    name: "Domaine",
    label: <div style={{ fontFamily: "Segoe UI", fontSize: 15, color: '#007BFF'}}>Domaine</div>,
    options: {
      filter: true,
      sort: true,
      search: true, // Enable search for this column
      customBodyRender: (value, tableMeta, updateValue) => {
        return StyleData(value);
      },
    },
  },
  {
    name: "Coef",
    label: <div style={{ fontFamily: "Segoe UI", fontSize: 15, color: '#007BFF'}}>Coef</div>,
    options: {
      filter: true,
      sort: true,
      search: true, // Enable search for this column
      customBodyRender: (value, tableMeta, updateValue) => {
        return StyleData(value);
      },
    },
  },
     
  {
    name: "Credit",
    label: <div style={{ fontFamily: "Segoe UI", fontSize: 15, color: '#007BFF'}}>Credit</div>,
    options: {
      filter: true,
      sort: true,
      search: true, // Enable search for this column
      customBodyRender: (value, tableMeta, updateValue) => {
        return StyleData(value);
      },
    },
  },

  {
    name: "Volume_cours",
    label: <div style={{ fontFamily: "Segoe UI", fontSize: 15, color: '#007BFF'}}>Volume Cours</div>,
    options: {
      filter: true,
      sort: true,
      search: true, // Enable search for this column
      customBodyRender: (value, tableMeta, updateValue) => {
        return StyleData(value);
      },
    },
  },

  {
    name: "Volume_td",
    label: <div style={{ fontFamily: "Segoe UI", fontSize: 15, color: '#007BFF'}}>Volume TD</div>,
    options: {
      filter: true,
      sort: true,
      search: true, // Enable search for this column
      customBodyRender: (value, tableMeta, updateValue) => {
        return StyleData(value);
      },
    },
  },

  {
    name: "Volume_tp",
    label: <div style={{ fontFamily: "Segoe UI", fontSize: 15, color: '#007BFF'}}>Volume TP</div>,
    options: {
      filter: true,
      sort: true,
      search: true, // Enable search for this column
      customBodyRender: (value, tableMeta, updateValue) => {
        return StyleData(value);
      },
    },
  },
  ];

  const tableData = [
    {
        Code: "CP101",
        Specilite: "SIT",
        Titre: "Introduction to Software Engineering",
        Domaine: "Ingenierie des logiciels",
        Coef: 3,
        Credit: 4,
        Volume_cours: 30,
        Volume_td: 20,
        Volume_tp: 10
    },
    {
        Code: "CP102",
        Specilite: "SIL",
        Titre: "Database Management Systems",
        Domaine: "Systemes d'information",
        Coef: 3,
        Credit: 4,
        Volume_cours: 30,
        Volume_td: 20,
        Volume_tp: 10
    },
    {
        Code: "CP103",
        Specilite: "SID",
        Titre: "Introduction to Infrastructure",
        Domaine: "Infrastructure",
        Coef: 3,
        Credit: 4,
        Volume_cours: 30,
        Volume_td: 20,
        Volume_tp: 10
    },
    {
        Code: "CP104",
        Specilite: "SIQ",
        Titre: "Operating Systems Fundamentals",
        Domaine: "Systemes d'exploitation",
        Coef: 3,
        Credit: 4,
        Volume_cours: 30,
        Volume_td: 20,
        Volume_tp: 10
    },
    {
        Code: "CP105",
        Specilite: "SIT",
        Titre: "Data Science Essentials",
        Domaine: "Sciences de donnees",
        Coef: 3,
        Credit: 4,
        Volume_cours: 30,
        Volume_td: 20,
        Volume_tp: 10
    },
    {
        Code: "CP106",
        Specilite: "SIL",
        Titre: "Web Development Basics",
        Domaine: "Ingenierie des logiciels",
        Coef: 3,
        Credit: 4,
        Volume_cours: 30,
        Volume_td: 20,
        Volume_tp: 10
    },
    {
        Code: "CP107",
        Specilite: "SID",
        Titre: "Networking Fundamentals",
        Domaine: "Infrastructure",
        Coef: 3,
        Credit: 4,
        Volume_cours: 30,
        Volume_td: 20,
        Volume_tp: 10
    },
    {
        Code: "CP108",
        Specilite: "SIQ",
        Titre: "Security Principles",
        Domaine: "Systemes d'exploitation",
        Coef: 3,
        Credit: 4,
        Volume_cours: 30,
        Volume_td: 20,
        Volume_tp: 10
    },
    {
        Code: "CP109",
        Specilite: "SIT",
        Titre: "Software Testing Techniques",
        Domaine: "Ingenierie des logiciels",
        Coef: 3,
        Credit: 4,
        Volume_cours: 30,
        Volume_td: 20,
        Volume_tp: 10
    },
    {
        Code: "CP110",
        Specilite: "SIL",
        Titre: "Database Design",
        Domaine: "Systemes d'information",
        Coef: 3,
        Credit: 4,
        Volume_cours: 30,
        Volume_td: 20,
        Volume_tp: 10
    }
];

  
  function StyleData(value){return <div style={{ fontFamily: "poppins", fontSize:"15px", marginLeft:16 }} >{value}</div>;}
  
  const options = {
    download: false, // Remove download option
    print: false, // Remove print option
    selectableRows: "none", // Remove checkbox selection
    filter: true,
    search: true, // Enable global search
    rowsPerPage: [5],
    textLabels: {
      pagination: {
        next: "Next >",
        previous: "< Previous",
        rowsPerPage: "Total items per page",
        displayRows: "of",
      },
    },
    onChangePage(currentPage) {
      console.log({ currentPage });
    },
    onChangeRowsPerPage(numberOfRows) {
      console.log({ numberOfRows });
    },
  };




function DetailsPgme(props) {
 
    
    const styleSelect = {
        Input: () => ({
            font:'400 14px/1.42 "Poppins", Helvetica, Arial, serif',
            
          }),
        indicatorSeparator: () => ({
            display: 'none',
          }),

        control: base => ({
          ...base,

width: '350px',
height: '36px',

background:'#FFFFFF',
border: '1px solid #007BFF',
borderRadius: '4px',
outline:'none',
font:'400 16px/1.42 "Segoe UI", Helvetica, Arial, serif',



        })
      };

  return (
    <div>
      <Navbar/>
       <Chatbot/>
      <div className={styles.DetailsPgmeContainer}>
       
       
       <div style={{ width: '90%',marginTop:'60px' ,marginBottom:'60px' }}>
    <MUIDataTable
        title={<div style={{ fontFamily: "poppins", fontSize: 25, fontWeight:"bold" }}>2CP</div>}
        columns={columns}
        data={tableData}
        options={options}
        className={styles.dataTable}
    />
</div>


       
      </div>
      <Footer/>
    </div>
  );
}

DetailsPgme.propTypes = {
  className: PropTypes.string,
};

export default DetailsPgme;
