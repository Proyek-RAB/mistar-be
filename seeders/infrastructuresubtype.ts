export const infrastructuresubtype = [
    {
        id: 1,
        type_id: 1,
        name: "Air Bersih",
        icon_url:process.env.BE_DOMAIN+"/static/icons/icon infras/water.svg",
    },
    {
        id: 2,
        type_id: 1,
        name: "Air Limbah",
        icon_url:process.env.BE_DOMAIN+"/static/icons/icon infras/air_limbah.svg",
    },
    {
        id: 3,
        type_id:2,
        name: "Jalan",
        icon_url: process.env.BE_DOMAIN+"/static/icons/icon infras/road.svg",
    },
    {
        id: 4,
        type_id:2,
        name: "Drainase",
        icon_url:process.env.BE_DOMAIN+"/static/icons/icon infras/drainase.svg",
    },
    {
        id: 5,
        type_id:3,
        name: "Lahan Parkir",
        icon_url: process.env.BE_DOMAIN+"/static/icons/icon infras/parkir.svg",
    },
]