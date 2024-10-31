import React, { useState } from 'react';
import Layout from './Layout';
import axios from 'axios';

function SettingsPage() {
    const [enablePublishing, setEnablePublishing] = useState(false);
    const [institutionName, setInstitutionName] = useState('');
    const [departmentName, setDepartmentName] = useState('');
    const [isSearchable, setIsSearchable] = useState(false); 
    const [extraSearchTerms, setExtraSearchTerms] = useState('');
    const [requirePassword, setRequirePassword] = useState(false);
    const [password, setPassword] = useState('');
    const [timezone, setTimezone] = useState('');

    const handleSave = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/publishing-settings', {
                institutionName,
                departmentName,
                isSearchable,
                extraSearchTerms,
                requirePassword,
                password,
                timezone,
            });
            alert(response.data.message); 
        } catch (error) {
            console.error('Error saving publishing settings:', error);
            alert('Error saving settings. Please try again.'); 
        }
    };

    return (
        <Layout>
            <div className="w-[85%] flex flex-col p-6">
                <h1 className="text-2xl font-bold mb-6">Settings</h1>
                
                <div className="grid grid-cols-3 gap-8">
                    <div className="col-span-2">
                        <div className="mb-8">
                            <label className="block text-lg mb-2">Set the first day of the year to:</label>
                            <div className="flex gap-4">
                                <select className="border-2 border-gray-300 rounded-md p-2">
                                    <option>Jan</option>
                                    <option>Feb</option>
                                    <option>Mar</option>
                                    <option>Apr</option>
                                    <option>May</option>
                                    <option>Jun</option>
                                    <option>Jul</option>
                                    <option>Aug</option>
                                    <option>Sep</option>
                                    <option>Oct</option>
                                    <option>Nov</option>
                                    <option>Dec</option>
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
                                    <option>10</option>
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

                        <h2 className="font-bold text-xl mb-4">Publishing</h2>
                        <label className="flex items-center gap-2 mb-4">
                            <input
                                type="checkbox"
                                className="w-4 h-4"
                                checked={enablePublishing}
                                onChange={() => setEnablePublishing(!enablePublishing)}
                            />
                            Enable Publishing
                        </label>

                        <div className={`border-2 border-gray-300 rounded-md p-4 ${enablePublishing ? 'bg-white' : 'bg-gray-200'}`}>
                            <div className="mb-4">
                                <label className="block text-sm mb-2">Your Institution’s name:</label>
                                <input
                                    type="text"
                                    placeholder="Institution Name"
                                    className="border-2 border-gray-300 rounded-md p-2 w-full"
                                    value={institutionName}
                                    onChange={(e) => setInstitutionName(e.target.value)}
                                    disabled={!enablePublishing}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm mb-2">Your department:</label>
                                <input
                                    type="text"
                                    placeholder="Department"
                                    className="border-2 border-gray-300 rounded-md p-2 w-full"
                                    value={departmentName}
                                    onChange={(e) => setDepartmentName(e.target.value)}
                                    disabled={!enablePublishing}
                                />
                            </div>

                            <label className="flex items-center gap-2 mb-4">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4"
                                    checked={isSearchable}
                                    onChange={() => setIsSearchable(!isSearchable)}
                                    disabled={!enablePublishing}
                                />
                                Make this account searchable on MedRez.net home page.
                            </label>

                            <label className="block text-sm mb-2">Extra search terms:</label>
                            <input
                                type="text"
                                placeholder="Extra search terms"
                                className="border-2 border-gray-300 rounded-md p-2 w-full"
                                value={extraSearchTerms}
                                onChange={(e) => setExtraSearchTerms(e.target.value)}
                                disabled={!enablePublishing}
                            />

                            <label className="flex items-center gap-2 mb-4">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4"
                                    checked={requirePassword}
                                    onChange={() => setRequirePassword(!requirePassword)}
                                    disabled={!enablePublishing}
                                />
                                Require password to view the schedules.
                            </label>

                            <label className="block text-sm mb-2">Password:</label>
                            <input
                                type="password"
                                placeholder="Password (letters and numbers only)"
                                className="border-2 border-gray-300 rounded-md p-2 w-full"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={!enablePublishing || !requirePassword}
                            />

                            <label className="block text-sm mb-2">Timezone for exported ICS calendar files:</label>
                            <select
                                className="border-2 border-gray-300 rounded-md p-2 w-full"
                                value={timezone}
                                onChange={(e) => setTimezone(e.target.value)}
                                disabled={!enablePublishing}
                            >
                                <option>Select Timezone</option>
                                <option>PST</option>
                                <option>GMT</option>
                                <option>PKT</option>

                            </select>

                            <button onClick={handleSave} className="bg-green-500 text-white px-6 py-2 rounded-md mt-4">
                                Save
                            </button>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-yellow-100 p-4 rounded-md">
                            <h3 className="font-bold">Academic Year Help</h3>
                            <p className="text-gray-600">
                                To understand the implications of this setting, please read the{' '}
                                <a href="#" className="text-blue-600 underline">Schedule Maker's Guide</a>.
                            </p>
                        </div>

                        <div className="border-2 border-blue-500 p-4 rounded-md">
                            <h3 className="font-bold">Publishing Help:</h3>
                            <p className="text-gray-600">
                                Publishing your schedules lets your residents and staff see when they work online.
                            </p>
                            <p className="text-gray-600">
                                We highly recommend that you use a password to prevent undesired access to the schedules.
                            </p>
                            <p className="text-gray-600">
                                Get more help on publishing in the{' '}
                                <a href="#" className="text-blue-600 underline">Schedule Maker's Guide</a>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default SettingsPage;
