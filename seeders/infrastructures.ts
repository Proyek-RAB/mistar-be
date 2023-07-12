import {v4 as uuidv4} from 'uuid';

export const infrastructures = [
    {
        id: uuidv4(),
        type_id: 1, 
        type_name: "Titik",
        sub_type_name:"Air Limbah",
        sub_type_id:2,
        name: "air di ciwaruga",
        description: {
            ownership: "bersama",
            stakeholder: "pemerintah",
            toilet_type: "pelengsengan",
            processing_type: "septic tank",
            service_scope : {
                capacity: 3,
                kk_count : 4,
                people_count: 20
                },
            monthly_service_bill: 10000,
            contact_person: "087848484848"
        }
    },
    {
        id: uuidv4(),
        type_id: 1,
        type_name: "Titik",
        sub_type_name:"Air Bersih",
        sub_type_id:1,
        name: "air di ciwaruga",
        description: {
            ownership: "sendiri",
            source:"sumur_air_tanah",
            service_scope : {
                capacity: 3,
                kk_count : 4,
                people_count: 20
            },
            monthly_service_bill: 10000,
            contact_person: "087848484848"
        }
    },
    {
        id: uuidv4(),
        type_id:1,
        type_name: "Titik",
        sub_type_name:"Air Bersih",
        sub_type_id:1,
        name: "air di ciwaruga",
        description: {
            ownership: "bersama",
            stakeholder: "pemerintah",
            source:"pdam",
            service_scope : {
                capacity: 3,
                kk_count : 4,
                people_count: 20
            },
            monthly_service_bill: 10000,
            contact_person: "087848484848"
        }
    },
    {
        id: uuidv4(),
        type_id: 1,
        type_name: "Titik",
        sub_type_name:"Titik Persampahan",
        sub_type_id:3,
        name: "titik pembuangan sampah rw 2",
        description: {
            ownership: "bersama",
            stakeholder: "pemerintah",
            waste_type: "tps",
            processing_type: "individual_langsung",
            service_scope : {
                capacity: 3,
                kk_count : 4,
                people_count: 20
            },
            monthly_service_bill: 10000,
            contact_person: "087848484848"
        }
    },
    {
        id: uuidv4(),
        type_id: 1,
        type_name: "Titik",
        sub_type_name:"Titik Persampahan",
        sub_type_id:3,
        name: "titik pembuangan sampah rw 2",
        description: {
            ownership: "bersama",
            stakeholder: "pemerintah",
            waste_type: "tps",
            processing_type: "individual_langsung",
            service_scope : {
                capacity: 3,
                kk_count : 4,
                people_count: 20
            },
            monthly_service_bill: 10000,
            contact_person: "087848484848"
        }
    },
    {
        id: uuidv4(),
        type_id: 1,
        type_name: "Titik",
        sub_type_name:"Titik Persampahan",
        sub_type_id:3,
        name: "titik pembuangan sampah rw 2",
        description: {
            ownership: "bersama",
            stakeholder: "pemerintah",
            waste_type: "tps",
            processing_type: "individual_langsung",
            service_scope : {
                capacity: 3,
                kk_count : 4,
                people_count: 20
            },
            monthly_service_bill: 10000,
            contact_person: "087848484848"
        }
    },
]