export default function Table() {
    return (
        <>
            <ul>
                <li className="grid grid-cols-2 gap-1" style={{ borderTop: '1px solid red', borderBottom: '1px solid red' }}>
                    <div className="p-2 bg-red-100">
                        <div className="p-2 m-1 ml-2 w-fit bg-red-200">
                            <div className=" text-3xl" style={{ lineHeight: '1' }}>100 ETB</div>
                            <div className="m-1" style={{ lineHeight: '1' }}>200 /CBE</div>


                        </div>
                    </div>
                    <div className="p-2 bg-red-100">
                        <div className="p-0 block w-fit ml-auto bg-red-200">
                            <div style={{ borderRadius: '100%' }} className="bg-red-500 p-3 w-auto">

                            </div>
                            <div className="m-1" style={{ fontSize: '0.7rem', lineHeight: '1' }}>lorem</div>
                            <div className="m-1" style={{ fontSize: '0.7rem', lineHeight: '1' }}>lorem</div>
                        </div>
                    </div>
                    <div className="p-2 bg-red-100">
                        <div className="p-2 w-fit bg-red-200">
                            <button className="p-1 px-4 bg-red-200">send</button>
                        </div>
                    </div>
                    <div className="p-2 grid place-content-end bg-red-100">
                        <div className="p-2 w-fit  bg-red-200">pending</div>
                    </div>
                </li>
                <li className="grid grid-cols-2 gap-1" style={{ borderTop: '1px solid red', borderBottom: '1px solid red' }}>
                    <div className="p-2 row-span-2 bg-red-100">
                        <div className="p-2 m-1 ml-2 w-fit bg-red-200">
                            <div className=" text-3xl" style={{ lineHeight: '1' }}>100 ETB</div>
                            <div className="m-1" style={{ lineHeight: '1' }}>200 /CBE</div>


                        </div>
                    </div>
                    <div className="p-2 bg-red-100">
                        <div className="p-0 block w-fit ml-auto bg-red-200">

                            <div className="m-1" style={{ fontSize: '0.8rem', lineHeight: '1' }}>lorem / lorem</div>
                        </div>
                    </div>
                    <div className="p-2 grid place-content-end bg-red-100">
                        <div className="p-2 w-fit  bg-red-200">pending</div>
                    </div>

                </li>
                <li className="grid grid-cols-2 gap-1" style={{ borderTop: '1px solid red', borderBottom: '1px solid red' }}>
                    <div className="p-2 grid place-content-start row-span-3 bg-red-100">
                        <div className="p-2 m-1 gml-2 w-fit bg-red-200">
                            <div className="m-1" style={{ lineHeight: '1' }}>lorems</div>
                            <div className="m-1" style={{ lineHeight: '1' }}>lorems</div>
                            <div className="m-1" style={{ lineHeight: '1' }}>lorems</div>
                            <div className="m-1" style={{ lineHeight: '1' }}>lorems</div>
                        </div>
                    </div>
                    <div className="p-2 bg-red-100">
                        <div className="p-0 block w-fit ml-auto bg-red-200">
                            <div style={{ borderRadius: '100%' }} className="bg-red-500 p-3 w-auto">

                            </div>
                            <div className="m-1" style={{ fontSize: '0.7rem', lineHeight: '1' }}>lorem</div>
                            <div className="m-1" style={{ fontSize: '0.7rem', lineHeight: '1' }}>lorem</div>
                        </div>
                    </div>

                    <div className="p-2 grid-cols-2 grid place-content-center bg-red-100">
                        <div className="mx-auto my-auto bg-red-100">
                            <div className="m-1" style={{ fontSize: '0.8rem', lineHeight: '1' }}>lorem&nbsp;&nbsp;&nbsp;lorem</div>

                        </div>
                        <div className="p-2 w-fit ml-auto bg-red-200">pending</div>
                    </div>
                </li>
                <li className="grid grid-cols-2 gap-1" style={{ borderTop: '1px solid red', borderBottom: '1px solid red' }}>
                    <div className="p-2 grid place-content-start  bg-red-100">
                        <div className="p-2 m-1 gml-2 w-fit bg-red-200">
                            <div className="m-1" style={{ lineHeight: '1' }}>lorems</div>
                            <div className="m-1" style={{ lineHeight: '1' }}>lorems</div>
                            <div className="m-1" style={{ lineHeight: '1' }}>lorems</div>
                            <div className="m-1" style={{ lineHeight: '1' }}>lorems</div>
                        </div>
                    </div>

                    <div className="p-2 grid-cols-2 h-full grid place-content-end bg-red-100">
                        <div className="mx-auto my-auto bg-red-100">
                            <div className="m-1" style={{ fontSize: '0.8rem', lineHeight: '1' }}>lorem&nbsp;&nbsp;&nbsp;lorem</div>

                        </div>
                        <div className="p-2 w-fit ml-auto bg-red-200">pending</div>
                    </div>
                </li>
                <li className="grid grid-cols-2 gap-1" style={{ borderTop: '1px solid red', borderBottom: '1px solid red' }}>
                    <div className="p-2 bg-red-100">
                        <div className="p-2 block w-fit mr-auto bg-red-200">
                            <div style={{ borderRadius: '100%' }} className="relative bg-red-500 p-3 w-auto">
                                <div style={{ borderRadius: '100%' }} className="absolute top-1 right-0 bg-red-700 p-1 w-auto">

                                </div>
                            </div>
                            <div className="m-1" style={{ fontSize: '0.8rem', lineHeight: '1' }}>lorem</div>
                            <div className="m-1" style={{ fontSize: '0.8rem', lineHeight: '1' }}>lorem</div>
                        </div>
                    </div>
                    <div className="row-span-2 grid place-content-centert text-center gap-2 p-2 bg-red-100">
                        <div>
                            <div className="m-1" style={{ fontSize: '0.8rem', lineHeight: '1' }}>lorem</div>
                            <div className="m-1" style={{ fontSize: '0.8rem', lineHeight: '1' }}>lorem</div>
                            <div className="m-1" style={{ fontSize: '0.8rem', lineHeight: '1' }}>lorem</div>
                            <div className="m-1" style={{ fontSize: '0.8rem', lineHeight: '1' }}>lorem</div>
                        </div>
                        <button className="p-1 px-4 bg-red-200">send</button>

                    </div>
                    <div className="p-2 bg-red-100">
                        <button className="p-1 px-4 bg-red-200">send</button>
                        <button className="p-1 px-4 ml-4 bg-red-200">send</button>

                    </div>

                </li>
            </ul>
        </>
    )
}