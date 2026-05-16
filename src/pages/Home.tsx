import { Link } from "react-router-dom";
import React, { useState, ReactElement, useRef } from 'react';
import { IconType } from 'react-icons';
import { Cloud, Upload, Folder, Search, SortAscIcon, Grid, List, File, EllipsisVertical, Trash, Edit, Share, Download } from 'lucide-react';
import axios from "axios";
import { NewHomeController } from "./HomeController"

const FileBrowser = () => {

    const controller = NewHomeController();



    // Mock data for files and directories
    const initialFiles = [
        { id: 1, name: 'Projects', type: 'folder', size: '2.4 GB', modified: '2024-03-20', items: 24 },
        { id: 2, name: 'Design Assets', type: 'folder', size: '1.8 GB', modified: '2024-03-19', items: 18 },
        { id: 3, name: 'Vacation Photos', type: 'folder', size: '4.2 GB', modified: '2024-03-18', items: 156 },
        { id: 4, name: 'Document.pdf', type: 'pdf', size: '2.4 MB', modified: '2024-03-20' },
        { id: 5, name: 'Presentation.pptx', type: 'ppt', size: '15.7 MB', modified: '2024-03-19' },
        { id: 6, name: 'Budget.xlsx', type: 'excel', size: '3.2 MB', modified: '2024-03-18' },
        { id: 7, name: 'Report.docx', type: 'word', size: '1.8 MB', modified: '2024-03-17' },
        { id: 8, name: 'Landscape.jpg', type: 'image', size: '4.5 MB', modified: '2024-03-16' },
        { id: 9, name: 'Music.mp3', type: 'audio', size: '8.2 MB', modified: '2024-03-15' },
        { id: 10, name: 'Tutorial.mp4', type: 'video', size: '245 MB', modified: '2024-03-14' },
        { id: 11, name: 'Archive.zip', type: 'archive', size: '125 MB', modified: '2024-03-13' },
        { id: 12, name: 'Notes.txt', type: 'file', size: '12 KB', modified: '2024-03-12' },
    ];

    const [selectedItems, setSelectedItems] = useState(new Set());
    // const [files, setFiles] = useState(initialFiles);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid'); // 'grid' or 'list'

    // Close context menu
    const closeContextMenu = () => {
        controller.SetContextMenu!({ show: false, x: 0, y: 0, itemId: "0" })
    };



    // Handle item selection
    const handleSelectItem = (e: any, id: string) => {
        // React.MouseEvent<HTMLElement, MouseEvent>
        e.stopPropagation();
        const newSelected = new Set(selectedItems);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedItems(newSelected);
    };

    // Handle context menu
    const handleContextMenu = (e: React.MouseEvent<HTMLElement, MouseEvent>, id?: string) => {
        e.preventDefault();

        if (!id) {
            // Right click on the Parent or empty space
            return;
        }

        // Stop the event from bubbling up to parent elements
        e.stopPropagation();
        controller.SetContextMenu({
            show: true,
            x: e.clientX,
            y: e.clientY,
            itemId: id
        });
    };

    // Format file size
    const formatSize = (size: string) => {
        return size ?? 0;
    };



    // Handle file actions
    const handleAction = (action: string, id: string) => {
        console.log(`${action} item ${id}`);
        closeContextMenu();

        switch (action) {
            case 'delete':
                // setFiles(files.filter(file => file.id !== id));
                // controller.SetDrive!(controller.Drive.filter(file => file.id !== id))
                break;
            case 'download':
                // Implement download logic
                break;
            case 'share':
                // Implement share logic
                break;
            case 'rename':
                // Implement rename logic
                break;
            default:
                break;
        }
    };



    return (
        <>
            <div className="min-h-screen bg-gray-50" onClick={closeContextMenu}>
                {/* Header */}
                <header className="bg-white border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <Cloud className="text-blue-600 text-2xl" />
                                <h1 className="text-2xl font-semibold text-gray-800">Cloud Drive</h1>
                            </div>
                            <div className="text-sm text-gray-500">
                                {selectedItems.size > 0
                                    ? `${selectedItems.size} item${selectedItems.size > 1 ? 's' : ''} selected`
                                    : `${controller.Files.length} items`
                                }
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <input
                                type="file"
                                ref={controller.FileInputRef}
                                onChange={controller.HandleFileChange}
                                style={{ display: 'none' }}
                            />
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2" onClick={controller.HandleUpload}>
                                <Upload />
                                <span>Upload</span>
                            </button>
                            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center space-x-2">
                                <Folder />
                                <span>New Folder</span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Toolbar */}
                <div className="bg-white border-b border-gray-200 px-6 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search files and folders..."
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            {/* Sort */}
                            <div className="flex items-center space-x-2">
                                <SortAscIcon className="text-gray-500" />
                                <select
                                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="name">Name</option>
                                    <option value="modified">Last Modified</option>
                                    <option value="size">Size</option>
                                </select>
                            </div>
                        </div>

                        {/* View Toggle */}
                        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                            <button
                                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}
                                onClick={() => { console.log("grid"); setViewMode('grid') }}
                            >
                                <Grid className={viewMode === 'grid' ? 'text-blue-600' : 'text-gray-500'} />
                            </button>
                            <button
                                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow' : ''}`}
                                onClick={() => setViewMode('list')}
                            >
                                <List className={viewMode === 'list' ? 'text-blue-600' : 'text-gray-500'} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <main className="p-6 bg-white mt-6" onContextMenu={(e) => handleContextMenu(e)}
                >
                    {viewMode === 'grid' ? (
                        // Grid View
                        // Grid View
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">

                            {/* Directories Map */}
                            {controller.Directories.map(directory => (
                                <div
                                    key={directory.id}
                                    className={`bg-white rounded-lg border p-4 cursor-pointer transition-all duration-200 hover:shadow-lg ${selectedItems.has(directory.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                                        }`}
                                    onClick={(e) => handleSelectItem(e, directory.id)}
                                    onContextMenu={(e) => handleContextMenu(e, directory.id)}
                                >
                                    <div
                                        key={directory.id}
                                        className={`bg-white rounded-lg border p-4 cursor-pointer transition-all duration-200 hover:shadow-lg ${selectedItems.has(directory.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                                            }`}
                                        onClick={(e) => handleSelectItem(e, directory.id)}
                                        onContextMenu={(e) => handleContextMenu(e, directory.id)}
                                    >
                                        <div className="flex flex-col items-center text-center">
                                            {/* Added transform and scale-150 to make it 150% size */}
                                            <div className="text-4xl mb-3 transform scale-150 mt-2">
                                                {controller.GetDriveIcon("test")}
                                            </div>

                                        </div>
                                    </div>
                                    <div className="w-full mt-4">
                                        <h3 className="font-medium text-gray-800 truncate mb-1">
                                            {directory.name}
                                        </h3>
                                        <div className="text-sm text-gray-500">
                                            {'folder' === 'folder' ? (
                                                <span>1 items</span>
                                            ) : (
                                                <span>{formatSize("0")}</span>
                                            )}
                                        </div>
                                        <div className="text-xs text-gray-400 mt-1">
                                            {/* Modified: {new Date(file.modified).toLocaleDateString()} */}
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    ) : (
                        // List View
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="py-3 px-4 text-left">
                                            <input
                                                type="checkbox"
                                                className="rounded"
                                                checked={selectedItems.size === controller.Directories!.length}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedItems(new Set(controller.Directories.map(f => f.id)));
                                                    } else {
                                                        setSelectedItems(new Set());
                                                    }
                                                }}
                                            />
                                        </th>
                                        <th className="py-3 px-4 text-left text-gray-600 font-medium">Name</th>
                                        <th className="py-3 px-4 text-left text-gray-600 font-medium">Size</th>
                                        <th className="py-3 px-4 text-left text-gray-600 font-medium">Type</th>
                                        <th className="py-3 px-4 text-left text-gray-600 font-medium">Last Modified</th>
                                        <th className="py-3 px-4 text-left text-gray-600 font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {controller.Directories.map((directory) => (
                                        <tr
                                            key={directory.id}
                                            className={`border-b border-gray-100 hover:bg-gray-50 ${selectedItems.has(directory.id) ? 'bg-blue-50' : ''
                                                }`}
                                            onClick={(e) => handleSelectItem(e, directory.id)}
                                            onContextMenu={(e) => handleContextMenu(e, directory.id)}
                                        >
                                            <td className="py-3 px-4">
                                                <input
                                                    type="checkbox"
                                                    className="rounded"
                                                    checked={selectedItems.has(directory.id)}
                                                    onChange={(e) => handleSelectItem(e, directory.id)}
                                                />
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="text-xl">
                                                        {/* {getFileIcon(file.type)} */}
                                                    </div>
                                                    <span className="font-medium text-gray-800">
                                                        {directory.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">
                                                {formatSize("0")}
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded capitalize">
                                                    {/* {file.type} */}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">
                                                {/* {new Date(file.modified).toLocaleDateString()} */}
                                            </td>
                                            <td className="py-3 px-4">
                                                <button
                                                    className="p-2 hover:bg-gray-100 rounded"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleContextMenu(e, directory.id);
                                                    }}
                                                >
                                                    <EllipsisVertical className="text-gray-500" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Empty State */}
                    {controller.Directories.length === 0 && (
                        <div className="text-center py-16">
                            <Cloud className="text-gray-300 text-6xl mx-auto mb-4" />
                            <h3 className="text-xl font-medium text-gray-500 mb-2">
                                No files found
                            </h3>
                            <p className="text-gray-400">
                                {searchQuery ? 'Try a different search term' : 'Upload your first file to get started'}
                            </p>
                        </div>
                    )}
                </main>

                {/* Context Menu */}
                {controller.ContextMenu.show && (
                    <div
                        className="fixed bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                        style={{ top: controller.ContextMenu.y, left: controller.ContextMenu.x }}
                    >
                        <button
                            className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-3"
                            onClick={() => handleAction('download', controller.ContextMenu.itemId)}
                        >
                            <Download className="text-gray-500" />
                            <span>Download</span>
                        </button>
                        <button
                            className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-3"
                            onClick={() => handleAction('share', controller.ContextMenu.itemId)}
                        >
                            <Share className="text-gray-500" />
                            <span>Share</span>
                        </button>
                        <button
                            className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-3"
                            onClick={() => handleAction('rename', controller.ContextMenu.itemId)}
                        >
                            <Edit className="text-gray-500" />
                            <span>Rename</span>
                        </button>
                        <div className="border-t border-gray-200 my-1"></div>
                        <button
                            className="w-full px-4 py-2 text-left hover:bg-gray-100 text-red-600 flex items-center space-x-3"
                            onClick={() => handleAction('delete', controller.ContextMenu.itemId)}
                        >
                            <Trash />
                            <span>Delete</span>
                        </button>
                    </div>
                )}

                {/* Storage Info */}
                <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-48">
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                                <span>Storage</span>
                                <span>12.4 GB of 15 GB</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '82%' }}></div>
                            </div>
                        </div>
                        <Cloud className="text-blue-600 text-xl" />
                    </div>
                </div>

            </div>
        </>
    );
};

export default FileBrowser;

