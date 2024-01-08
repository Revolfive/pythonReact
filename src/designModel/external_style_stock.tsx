import {useEffect, useRef, useState} from "react";
import axios from "axios";
import './design.css'
import {Card, Image, Pagination, Modal, Button} from 'antd';

const {Meta} = Card;

const MyCard = ({item, url, refId}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    let body = Object.entries(item).map(([key, value]) => {
        return (
            <p>
                <span>{key + ":" + value.toString()}</span>
            </p>
        )
    });
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Card
            style={{width: "300px", height: "345px"}}
            hoverable={true}
            bordered={true}
            cover={
                <Image
                    style={{height: "210px"}}
                    alt="example"
                    src={url}
                    placeholder={<span>预览</span>}
                />
            }
            // actions={[
            //     <SettingOutlined key="setting"/>,
            //     <EditOutlined key="edit"/>,
            //     <EllipsisOutlined key="ellipsis"/>,
            // ]}
        >
            <Meta
                title={
                    <>
                        <div style={{height: "90px"}}>
                            <div>
                                <p>{"款号：" + item['goodsCode']}</p>
                                <p>{"款号后缀：" + item['goodsCodeSuffix']}</p>
                            </div>
                            <div>
                                <Button type="primary" onClick={showModal}>
                                    详情
                                </Button>
                                {isModalOpen &&
                                    <Modal
                                        title="款式详情"
                                        open={isModalOpen}
                                        onOk={handleOk}
                                        okText={"保存"}
                                        onCancel={handleCancel}
                                        width={"85%"}
                                        style={{
                                            top: "40px",
                                        }}
                                        footer={<>
                                            <Button type="primary" onClick={handleCancel}>
                                                取消
                                            </Button>
                                            <Button type="primary" onClick={showModal}>
                                                重置
                                            </Button>
                                            <Button type="primary" onClick={handleOk}>
                                                保存
                                            </Button>
                                        </>
                                        }
                                    >
                                        <div style={{height: "75vh", overflow: "auto"}}>
                                            {body}
                                            {/*<p>11</p>*/}
                                        </div>
                                    </Modal>}
                            </div>
                        </div>
                    </>
                }
            />
        </Card>
    )
}


function MyTable({columnList, pageDisplay}) {
    const refId = useRef(0)
    let cards = []
    const columnLists = columnList['data']['rows']
    columnLists.forEach((item) => {
        const url = item['goodsPhoto'].length !== 0 ? item['goodsPhoto'][0]['url'] : ''
        cards.push(<MyCard key={item.id} item={item} url={url} refId={refId}></MyCard>)
    })
    return <>
        {pageDisplay}
        <section className="myTable">
            {cards}
        </section>
    </>
}

const GetDesign = () => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');
    const [max, setMax] = useState(0)
    let refPage = useRef(1)
    let refSpec = useRef(10)

    const setSetting = (data) => {
        setData(data);
        setMax(data['data']['total'])
    }

    useEffect(() => {
        getData()
    }, [])


    const getData = async () => {
        setIsLoading(true);
        try {
            const {data} = await axios.post(
                'https://test.chuxianyun.com/api/oms/template/query/search',
                {
                    "currentPage": refPage.current,
                    "pageCapacity": refSpec.current,
                    "businessType": 1,
                    "moduleType": 1,
                    "filter": {"isOpen": [0], "materialId": ["1", "2", "3", "6", "7"]}
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'token': 'a494e980c75364f27c8ae3f2c2d34f73'
                    },
                },
            );
            setSetting(data)
        } catch (err) {
            setErr(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const onChange = (page, pageSize) => {
        refPage.current = page
        refSpec.current = pageSize
        getData()
    };

    // const onShowSizeChange = () => {
    //     console.log(current)
    //     console.log(current)
    //
    //     refSpec.current = size
    //     getData()
    // }
    return <>
        {isLoading && <h2>Loading...</h2>}
        {err && <h2>{err}</h2>}
        {data && (
            <MyTable columnList={data} pageDisplay={
                <Pagination
                    current={refPage.current}
                    defaultCurrent={1}
                    defaultPageSize={refSpec.current}
                    total={max}
                    showSizeChanger={true}
                    onChange={onChange}
                    pageSizeOptions={[1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50]}
                    showQuickJumper={true}
                    // showTitle={true}
                    // onShowSizeChange={onShowSizeChange}

                />
            }/>
        )}
    </>
}

function Gallery() {

    return (
        <>
            <GetDesign/>
        </>
    )

}

export default Gallery
