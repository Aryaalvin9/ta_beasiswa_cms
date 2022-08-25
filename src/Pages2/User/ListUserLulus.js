import React, { useState, useEffect, Fragment } from "react";
import "./style.css";
import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer } from 'cdbreact';
import axios from "axios";
const ListUserLulus = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  function currencyFormat(num) {
    return 'Rp. ' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
  function renderSwitch(param) {
    switch(param) {
      case 1:
        return 'Kota/Kabupaten';
      case 2:
        return 'Provinsi';
      case 3:
        return 'Nasional';
      case 4:
        return 'Internasional';
      default:
        return 'Proses';
    }
  }

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      axios
        .get("https://aryautility1.herokuapp.com/user/lulus")
        .then((res) => {
          setPosts(res.data.data);
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
          label: 'No',
          field: 'no',
          width: 50,
        },
        {
          label: 'Name',
          field: 'name',
          width: 200,
        },
        {
          label: 'Email',
          field: 'email',
          width: 200,
        },
        {
          label: 'Nomor Telpon',
          field: 'ntp',
          width: 150,
        },
        {
          label: 'Status Lulus',
          field: 'setlulus',
          width: 150,
        },
        {
          label: 'Penghasilan',
          field: 'penghasil',
          width: 200,
        },
        {
          label: 'Jumlah Tanggungan',
          field: 'jumTang',
          width: 180,
          
        },
        {
          label: 'Fakultas Diambil',
          field: 'fakultas',
          width: 150,
        },
        {
          label: 'Nilai Rata-Rata',
          field: 'nilai',
          width: 130,
        },
        {
          label: 'Tingkat Sertifikat',
          field: 'tingkat_sertif',
          width: 150,
        },
      ],
      rows: 
        posts.map((post, index) => ({
          no: index+1,
          name: post.name,
          email: post.email,
          ntp: post.nomor_tlp,
          setlulus: post.status_lulus,
          penghasil: currencyFormat(post.pendapatan),
          jumTang: post.jumlah_tanggungan,
          fakultas: post.fakultas_diambil,
          nilai: post.niali_rata,
          tingkat_sertif:renderSwitch(post.tingkat_sertif), 
        }))  

    };
  };

  return (
    <CDBContainer>
      <CDBCard>
        <CDBCardBody>
          <CDBDataTable
           striped
           bordered
           hover
           scrollX
           scrollY
          //  maxHeight="300xp"
           data={data()}
           materialSearch
          //  fullPagination
          />
        </CDBCardBody>
      </CDBCard>
    </CDBContainer>
  );
};

export default ListUserLulus;
