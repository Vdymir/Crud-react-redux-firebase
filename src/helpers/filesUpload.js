import Swal from 'sweetalert2';

export const filesUpload = async (file) => {
    const cloudUrl = 'https://api.cloudinary.com/v1_1/daivqmwdj/upload'
    const formDate = new FormData();

    formDate.append('upload_preset', 'react-journal');
    formDate.append('file', file);

    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formDate
        });

        if(resp.ok) {
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        }
    } catch (e) {
        Swal.fire('Error', e.message, 'error')
    }
}