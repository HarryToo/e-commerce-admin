// 配置数据模板

// 网站
export const WebsiteConfigTemplate = class {
    constructor() {
        return {
            // 最近保存时间
            updateTime: '',
            // 首页
            homepage: {
                logo: '',
                classify: [
                    {
                        name: '',
                        classify: {
                            ids: [],
                            tree: []
                        }
                    }
                ],
                banner: [
                    {
                        img: '',
                        timePeriod: [],
                        link: {
                            type: 1,
                            value: ''
                        }
                    }
                ],
                floor: [
                    {
                        id: 1,
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
                        id: 2,
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
                        id: 3,
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
                        id: 4,
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
                ],
                baseGoodsList: {
                    title: '',
                    goodsPresetType: 1,
                    goodsIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
                }
            },
            // 专场频道
            specialChannel: {
                bannerImg: '',
                goodsGroups: [
                    {
                        title: '',
                        goodsIds: []
                    }
                ]
            },
            // 排行榜单
            leaderboard: [
                {
                    title: '',
                    // 排序方式：1.以入库时间（倒序）排序, 2.以采购量排序, 3.以铺货量排序
                    sortBy: 1,
                    maxLength: 50
                }
            ]
        }
    }
}

// APP
export const AppConfigTemplate = class {
    constructor() {
        return {}
    }
}