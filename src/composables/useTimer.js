

export const useTimer = (duration = 90) => {
    let remaining = ref(duration)
    let intervalId = ref()
    let running = ref(false)

    const minutes = computed(() => {
        return Math.floor(remaining.value / 60)
    })

    const seconds = computed(() => {
        return Math.floor(remaining.value % 60)
    })

    const formatTimer = computed(() => {
        return `${minutes.value}:${String(seconds.value).padStart(2, '0')}`
    })

    const isRunning = () => {
        return running.value
    }

    const start = () => {
        if(!!intervalId.value) clearInterval(intervalId.value)
        running.value = true

        intervalId.value = setInterval(() => {
            if(remaining.value > 0){
                remaining.value--
            }else{

                end()
            }
        }, 1000)
    }

    const end = () => {
        clearInterval(intervalId.value)
        intervalId.value = null
        remaining.value = duration

        running.value = false
    }

    const reset = () => {
        end()
        start()
    }


    return {
        minutes,
        seconds,
        formatTimer,
        isRunning,
        start,
        reset,
        end,
    }
}