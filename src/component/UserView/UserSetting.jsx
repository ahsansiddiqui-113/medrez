import React, { useState } from 'react';
import UserLayout from './UserLayout';

function UserSettingsPage() {
    const [enablePublishing, setEnablePublishing] = useState(false);

    return (
        <UserLayout>
            <div className="w-[85%] flex flex-col p-6">
                    <h1 className="text-2xl font-bold mb-6">Setting</h1>
                    <div className="mb-8">
                        <label className="block text-lg mb-2">Set the first day of the year to:</label>
                        <div className="flex gap-4">
                            <select className="border-2 border-gray-300 rounded-md p-2">
                                <option>July</option>
                                <option>August</option>
                                <option>September</option>
                                <option>October</option>
                                <option>November</option>
                                <option>December</option>
                                <option>January</option>
                                <option>March</option>
                                <option>April</option>
                                <option>May</option>
                                <option>June</option>

                            </select>
                            <select className="border-2 border-gray-300 rounded-md p-2">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>11</option>
                                <option>12</option>
                                <option>13</option>
                                <option>14</option>
                                <option>15</option>
                                <option>16</option>
                                <option>17</option>
                                <option>18</option>
                                <option>19</option>
                                <option>20</option>
                                <option>21</option>
                                <option>22</option>
                                <option>23</option>
                                <option>24</option>
                                <option>25</option>
                                <option>26</option>
                                <option>27</option>
                                <option>28</option>
                                <option>29</option>
                                <option>30</option>
                                <option>31</option>
                                
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h2 className="font-bold text-xl mb-4">Publishing</h2>
                            <div className="mb-4">
                                <h3 className="font-semibold mb-2">Publishing Settings</h3>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4"
                                        checked={enablePublishing}
                                        onChange={() => setEnablePublishing(!enablePublishing)}
                                    />
                                    Enable Publishing
                                </label>
                            </div>

                            <div className="border-2 border-gray-300 rounded-md p-4">
                                <div className="mb-4">
                                    <label className="block text-sm mb-2">Your Institution’s name:</label>
                                    <input
                                        type="text"
                                        placeholder="Institution Name"
                                        className="border-2 border-gray-300 rounded-md p-2 w-full"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm mb-2">Your department:</label>
                                    <input
                                        type="text"
                                        placeholder="Department"
                                        className="border-2 border-gray-300 rounded-md p-2 w-full"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        Make this account searchable on MedRez.net home page.
                                    </label>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm mb-2">Extra search terms:</label>
                                    <input
                                        type="text"
                                        placeholder="Department"
                                        className="border-2 border-gray-300 rounded-md p-2 w-full"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="w-4 h-4" />
                                        Require password to view the schedules.
                                    </label>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm mb-2">Password:</label>
                                    <input
                                        type="password"
                                        placeholder="Password (letters and numbers only)"
                                        className="border-2 border-gray-300 rounded-md p-2 w-full"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm mb-2">Timezone for exported ICS calendar files:</label>
                                    <select className="border-2 border-gray-300 rounded-md p-2 w-full">
                                        <option>Department</option>
                                    </select>
                                </div>

                                <button className="bg-green-500 text-white px-6 py-2 rounded-md">Save</button>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-yellow-100 p-4 rounded-md">
                                <h3 className="font-bold">Academic Year Help</h3>
                                <p className="text-gray-600">To understand the implications of this setting, please read the <a href="#" className="text-blue-600 underline">Schedule Maker's Guide</a>.</p>
                            </div>

                            <div className="border-2 border-blue-500 p-4 rounded-md">
                                <h3 className="font-bold">Publishing Help:</h3>
                                <p className="text-gray-600">Publishing your schedules lets your residents and staff see when they work online.</p>
                                <p className="text-gray-600">We highly recommend that you use a password to prevent undesired access to the schedules.</p>
                                <p className="text-gray-600">Get more help on publishing in the <a href="#" className="text-blue-600 underline">Schedule Maker's Guide</a>.</p>
                            </div>
                        </div>
                    </div>
                </div>
        </UserLayout>
    );
}

export default UserSettingsPage;
