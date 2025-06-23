import QRCodeStyling from 'qr-code-styling'



export const useQrCode = (string = 'default', opts = defaultOptions) => {
    const img = ref()
    const options = ref({
        ...defaultOptions,
        ...opts,
    })
    const qrCode = ref()


    const createQr = () => {
        qrCode.value =  new QRCodeStyling({
            width: options.value.width,
            height: options.value.height,
            type: options.value.type,
            data: string,
            image: options.value.shortLogo,
            dotsOptions: options.value.dotsOptions,
            backgroundOptions: options.value.backgroundOptions,
            cornersSquareOptions: options.value.cornersSquareOptions,
            cornersDotOptions: options.value.cornersDotOptions,
            imageOptions: options.value.imageOptions,
        })
    }



    const getBase64 = (type = 'png') => {
        qrCode.value.getRawData(type).then(blob => {
            const reader = new FileReader()

            reader.onloadend = function() {
                img.value = reader.result
            }

            reader.readAsDataURL(blob)
        })
    }

    const getImg = () => {
        return img.value
    }


    createQr()
    getBase64()

    return {
        img,
        width: options.value.width,
        height: options.value.height,
        getImg,

        getBase64,
    }
}


const defaultOptions = {
    width: 300,
    height: 300,
    type: 'svg',
    shortLogo: null,
    dotsOptions: {
        color: '#1A2D61',
        type: "dots",
    },
    backgroundOptions: {
        color: "#ffffff",
    },
    cornersSquareOptions:  {
        type: "extra-rounded",
    },
    cornersDotOptions: {
        type: 'dot',
    },
    imageOptions: {
        crossOrigin: "anonymous",
        margin: 0,
        imageSize: 0.2,
    },
}