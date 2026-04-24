import React, { useState, useRef } from 'react';
import axios from "axios";
import "reflect-metadata";


interface FileContextMenu {
    show: boolean;
    x: number;
    y: number;
    itemId: number;
}

class HomeController {
    public ContextMenu;
    public SetContextMenu;
    public FileInputRef: React.RefObject<HTMLInputElement | null>;

    constructor(
        contextMenu: FileContextMenu,
        setContextMenu: React.Dispatch<React.SetStateAction<FileContextMenu>>,
        fileInputRef: React.RefObject<HTMLInputElement | null>
    ) {
        this.SetContextMenu = setContextMenu;
        this.ContextMenu = contextMenu;
        this.FileInputRef = fileInputRef;
        this.HandleUpload = this.HandleUpload.bind(this);
    }

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

    HandleUpload() {
        this.FileInputRef?.current?.click();
    };

}


export function NewHomeController() {
    const [contextMenu, setContextMenu] = useState<FileContextMenu>({ show: false, x: 0, y: 0, itemId: 0 });
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    return new HomeController(contextMenu, setContextMenu, fileInputRef)
}