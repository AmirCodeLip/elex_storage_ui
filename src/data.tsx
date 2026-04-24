type ProductType = {
    id: number,
    categoryId: number,
    properties?: { n: string, v: string }[],
    name: string,
    description: string,
    price: number,
    src200: string
}

type KeyValue = {
    key: string,
    value: string
}

export type FormInfoType = {
    label: string,
    type: "select" | "text" | "file"
    options?: Array<KeyValue>
}

var publicPageForm: Array<FormInfoType> = [
    {
        label: "نوع مدار چاپی",
        type: "select",
        options: [
            {
                key: "1",
                value: "استخوانی 1 لایه"
            },
            {
                key: "2",
                value: "فایبر 1 لایه"
            },
            {
                key: "3",
                value: "آلومینیوم 1 لایه"
            },
            {
                key: "4",
                value: "فایبر 2 لایه متالیزه"
            },
            {
                key: "5",
                value: "فایبر 2 لایه غیر متالیزه"
            },
            {
                key: "6",
                value: "راجرز + تفلون 1 لایه"
            },
            {
                key: "7",
                value: "راجرز + تفلون 1 لایه"
            }
        ]
    },
    {
        label: "فایل فقط با فرمت zip",
        type: "file"
    },
    {
        label: "عرض به میلی متر",
        type: "text"
    },
    {
        label: "طول به میلی متر",
        type: "text"
    },

]

export const publicPages = [
    {
        title: "سفارش چاپ",
        url: "neworder",
        formInfo: publicPageForm
    }
]

const products: Array<ProductType> = [
    {
        id: 1,
        categoryId: 1,
        name: "CF14JT10K0",
        description: "مقاومت محوری RES 10 کیلو اهم 5% 1/4 وات",
        price: 1000,
        src200: "/imgs/products/200/CF 10k_sml.jpg"
    }
];

export default {
    "settings": {
        "siteNameEN": "nanobita.ir"
    },
    "categories": [{
        id: 1,
        name: "مقاومت"
    },
    {
        id: 2,
        name: "دیود"
    }],
    "products": products
}