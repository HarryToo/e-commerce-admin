// 可活动楼层区域各类型板块的数据模板
// ***（直接对象会导致vuex数据与新增的楼层模块共用一份数据，出现复制而非新增的问题，故数据模板设计为class形式）***

export const website = {
    homepage: {
        Floor: class {
            constructor() {
                return [
                    {
                        type: 1,
                        homepageImage: '',
                        homepageImageLink: {
                            type: 1,
                            value: ''
                        },
                        innerPageBanner: '',
                        goodsPresetType: 1,
                        goodsIds: [1, 2, 3]
                    },
                    {
                        type: 2,
                        title: '',
                        plates: [
                            {
                                homepageImage: '',
                                homepageImageLink: {
                                    type: 1,
                                    value: ''
                                },
                                innerPageBanner: '',
                                goodsList: [
                                    {
                                        image: '',
                                        link: {
                                            type: 1,
                                            value: ''
                                        },
                                        innerPageBanner: ''
                                    },
                                    {
                                        image: '',
                                        link: {
                                            type: 1,
                                            value: ''
                                        },
                                        innerPageBanner: ''
                                    },
                                    {
                                        image: '',
                                        link: {
                                            type: 1,
                                            value: ''
                                        },
                                        innerPageBanner: ''
                                    }
                                ]
                            },
                            {
                                homepageImage: '',
                                homepageImageLink: {
                                    type: 1,
                                    value: ''
                                },
                                innerPageBanner: '',
                                goodsList: [
                                    {
                                        image: '',
                                        link: {
                                            type: 1,
                                            value: ''
                                        },
                                        innerPageBanner: ''
                                    },
                                    {
                                        image: '',
                                        link: {
                                            type: 1,
                                            value: ''
                                        },
                                        innerPageBanner: ''
                                    },
                                    {
                                        image: '',
                                        link: {
                                            type: 1,
                                            value: ''
                                        },
                                        innerPageBanner: ''
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        type: 3,
                        title: '',
                        plates: [
                            {
                                homepageImage: '',
                                homepageImageLink: {
                                    type: 1,
                                    value: ''
                                },
                                innerPageBanner: '',
                                goodsPresetType: 1,
                                goodsIds: [1, 2, 3]
                            },
                            {
                                homepageImage: '',
                                homepageImageLink: {
                                    type: 1,
                                    value: ''
                                },
                                innerPageBanner: '',
                                goodsPresetType: 1,
                                goodsIds: [1, 2, 3]
                            }
                        ]
                    },
                    {
                        type: 4,
                        title: '',
                        homepageImage: '',
                        homepageImageLink: {
                            type: 1,
                            value: ''
                        },
                        innerPageBanner: '',
                        goodsPresetType: 1,
                        goodsIds: [1, 2, 3]
                    }
                ]
            }
        }
    }
}