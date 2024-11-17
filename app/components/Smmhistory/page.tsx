
import { List, Section } from "@telegram-apps/telegram-ui";


const Smmhistory = () => {




    return (
        <>
            <List
                style={{

                    padding: '20px 0px',

                }}
            >
                <Section header="Order History">
                    <div style={{ width: '95%' }} className="  mx-auto">

                        <div className="bg-red-100 w-full overflow-x-auto">
                            <table style={{ width: '100%' }} className=" bg-white border border-gray-200 rounded-lg shadow-md">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Age</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Email</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-6 py-4 text-sm text-gray-900">John Doe</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">28</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">john@example.com</td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="px-6 py-4 text-sm text-gray-900">Jane Smith</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">32</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">jane@example.com</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 text-sm text-gray-900">Sam Brown</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">24</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">sam@example.com</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </Section>
            </List>
        </>
    );
}

export default Smmhistory;