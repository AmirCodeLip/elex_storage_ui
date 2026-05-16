import React, { useState, useRef, useEffect } from 'react';
import axios from "axios";
import "reflect-metadata";
import { getStorage } from "@elex-storage/js-client"
import { DirectoryInfo, FileInfo, StorageItemsResponse } from "@elex-storage/js-client/models"
import { string } from 'yup';
import { Folder, File } from 'lucide-react';
import { setFips } from 'node:crypto';

interface FileContextMenu {
    show: boolean;
    x: number;
    y: number;
    itemId: string;
}

class HomeController {

    public FileInputRef: React.RefObject<HTMLInputElement | null>;

    public ContextMenu: FileContextMenu;
    public SetContextMenu: React.Dispatch<React.SetStateAction<FileContextMenu>>;

    public IsLoading: boolean;
    public SetIsLoading: React.Dispatch<React.SetStateAction<boolean>>;

    public Directories: DirectoryInfo[] = [];
    public SetDirectories?: React.Dispatch<React.SetStateAction<DirectoryInfo[]>>;

    public Files: FileInfo[] = [];
    public SetFiles?: React.Dispatch<React.SetStateAction<FileInfo[]>>;

    constructor(
        contextMenu: [FileContextMenu, React.Dispatch<React.SetStateAction<FileContextMenu>>],
        loading: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
        directories: [DirectoryInfo[], React.Dispatch<React.SetStateAction<DirectoryInfo[]>>],
        files: [FileInfo[], React.Dispatch<React.SetStateAction<FileInfo[]>>],
        fileInputRef: React.RefObject<HTMLInputElement | null>
    ) {
        [this.ContextMenu, this.SetContextMenu] = contextMenu;
        [this.IsLoading, this.SetIsLoading] = loading;
        [this.Directories, this.SetDirectories] = directories;
        [this.Files, this.SetFiles] = files;
        this.FileInputRef = fileInputRef;
        this.HandleUpload = this.HandleUpload.bind(this);
    }


    async LoadData() {
        const [storage, error] = await getStorage("");
        if (error == null) {
            this.SetDirectories!(storage!.directories!)
        }
    }

    HandleUpload() {
        this.FileInputRef?.current?.click();
    };

    async HandleFileChange(event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) {
        const files = event.target!.files;
        if (files && files?.length > 0) {
            const file = files[0];
            console.log("فایل انتخاب شده:", file.name);
            try {
                const formData = new FormData();
                formData.append("file", file);
                const response = await axios.post(
                    "http://localhost:8082/file/upload",
                    formData,
                    {
                        headers: {
                            "Content-Type": undefined, // let browser handle it
                        },
                        transformRequest: (data) => data, // prevent Axios from transforming FormData
                    }
                );


                console.log("Upload success:", response.data);
            } catch (error) {
                console.error("Upload error:", error);
            }
        }
    }

    // Get icon based on type
    GetDriveIcon = (type: string) => {
        switch (type) {
            // case 'folder': return <FaFolder className="text-blue-500" />;
            // case 'pdf': return <FaFilePdf className="text-red-500" />;
            // case 'word': return <FaFileWord className="text-blue-600" />;
            // case 'excel': return <FaFileExcel className="text-green-600" />;
            // case 'ppt': return <FaFilePowerpoint className="text-orange-500" />;
            // case 'image': return <FaImage className="text-purple-500" />;
            // case 'audio': return <FaFileAudio className="text-yellow-500" />;
            // case 'video': return <FaFileVideo className="text-pink-500" />;
            // case 'archive': return <FaFileArchive className="text-gray-500" />;
            default: return <Folder className="text-gray-400" size={140} />
        }
    };

}


export function NewHomeController() {
    const contextMenu = useState<FileContextMenu>({ show: false, x: 0, y: 0, itemId: "0" });
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const loading = useState(true);
    const directories = useState<DirectoryInfo[]>([]);
    const files = useState<FileInfo[]>([]);

    var controller = new HomeController(contextMenu, loading, directories, files, fileInputRef);

    useEffect(() => {
        controller.LoadData();
    }, []); // <-- The empty array means "run only once on mount"

    return controller
}


// // Filter files based on search
//     const filteredFiles = controller.Drive.filter(file =>
//         file.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     // Sort files
//     const sortedFiles = [...filteredFiles].sort((a, b) => {
//         switch (sortBy) {
//             case 'name':
//                 return a.name.localeCompare(b.name);
//             case 'size':
//                 return parseFloat(a.size) - parseFloat(b.size);
//             // case 'modified':
//             // let d = (new Date(b.modified)).getDay() - new Date(a.modified).getDay();
//             // let d = (new Date(b.modified)) - new Date(a.modified);
//             // return d
//             default:
//                 return 0;
//         }
//     });