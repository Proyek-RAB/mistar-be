export const infrastructuretypes = [
    {
        id: 1,
        type: 'Titik',
        icon_url:process.env.BE_DOMAIN+"/static/icons/icon marker/titik.svg",
        sub_type: [
            {
                sub_type_id: 1,
                name: "Air Bersih",
                icon_url:process.env.BE_DOMAIN+"/static/icons/icon infras/water.svg"
            },
            {
                sub_type_id: 2,
                name: "Air Limbah",
                icon_url:process.env.BE_DOMAIN+"/static/icons/icon infras/air_limbah.svg"
            }
        ]
    },
    {
        id: 2,
        type: 'Garis',
        icon_url:process.env.BE_DOMAIN+"/static/icons/icon marker/Garis.svg",
        sub_type: [
            {
                sub_type_id: 1,
                name: "Jalan",
                icon_url: process.env.BE_DOMAIN+"/static/icons/icon infras/road.svg",
            },
            {
                sub_type_id: 2,
                name: "Drainase",
                icon_url:process.env.BE_DOMAIN+"/static/icons/icon infras/drainase.svg"
            }
        ]
    },
    {
        id: 3,
        type: 'Bidang',
        icon_url: process.env.BE_DOMAIN+"/static/icons/icon marker/parkir.svg",
        sub_type: [
            {
                sub_type_id: 1,
                name: "Lahan Parkir",
                icon_url: process.env.BE_DOMAIN+"/static/icons/icon infras/parkir.svg",
            },
        ]
    },
]