
import { Doughnut } from 'react-chartjs-2';

// import {Chart, ArcElement} from 'chart.js'
// Chart.register(ArcElement);


import React, { useState, useEffect, Fragment } from "react";

import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer } from 'cdbreact';
import axios from "axios";
import { IconBase } from 'react-icons/lib';
import { FaIcons } from 'react-icons/fa';
import "./home.css";
// import "./css/sb-admin-2.css";

const Home = () => {
 
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState();
  const [count2, setCount2] = useState();
  const [count3, setCount3] = useState();
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      axios
        .get("https://aryautility1.herokuapp.com/users")
        .then((res) => {
        
          setCount(res.data.count);
          setLoading(false);
          console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 0);
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      axios
        .get("https://aryautility1.herokuapp.com/user/lulus")
        .then((res) => {
        
          setCount2(res.data.count);
          setLoading(false);
          console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 0);
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      axios
        .get("https://aryautility1.herokuapp.com/admin/getTotalPerProdi")
        .then((res) => {
          setPosts(res.data.data);
          setCount3(res.data.count);
          setLoading(false);
          console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 0);
  }, []);

  const data = () => {
    return {
      columns:
       [
        {
          label: 'Program Studi',
          field: 'prodi',
          width: 200,
        },
        {
          label: 'Jumlah Mendaftar',
          field: 'jumdaf',
          width: 200,
        },
      ],
      rows: 
        posts.map((post, index) => ({
          prodi: post.fakultas_diambil,
          jumdaf: post.total,
      
        }))  

    };
  };

  return  (<>
   <div class="container mt-4">
    <div className="row align-items-left">
    <div className="col-xl-4 col-md-4 mb-4">
          <div className="border-left-primary shadow h-100 py-2">
              <div className="card-body">
                  <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                              User Mendaftar</div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">{count}</div>
                      </div>
                      <div className="col-auto">
                          <i className="fas fa-user fa-2x text-primary"></i>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div className="col-xl-4 col-md-6 mb-4">
          <div className="border-left-primary2 shadow h-100 py-2">
              <div className="card-body">
                  <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-primary2 text-uppercase mb-1">
                              User Lolos</div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">{count2}</div>
                      </div>
                      <div className="col-auto">
                          <i className="fas fa-graduation-cap fa-2x text-primary2"></i>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div className="col-xl-4 col-md-6 mb-4">
          <div className="border-left-primary3 shadow h-100 py-2">
              <div className="card-body">
                  <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-primary3 text-uppercase mb-1">
                              Jumlah Prodi</div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">{count3}</div>
                      </div>
                      <div className="col-auto">
                          <i className="fas fa-school fa-2x text-primary3"></i>
                      </div>
                  </div>
              </div>
          </div>
      </div>  
   </div>
   </div>
   <div>
   <CDBContainer>
      <CDBCard>
        <CDBCardBody>
          <CDBDataTable
           striped
           bordered
           hover
           scrollX
           scrollY
           maxHeight="300xp"
           data={data()}
           materialSearch
           fullPagination
          />
        </CDBCardBody>
      </CDBCard>
    </CDBContainer>
   </div>
   </>
  );
};

export default Home;