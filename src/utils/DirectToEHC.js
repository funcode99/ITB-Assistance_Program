const directToEHC = () => {
    const EHCNumber = [628111957666, 6281387612828, 6281387612837, 6281387612842]
    const url = `https://wa.me/${EHCNumber[Math.floor(Math.random() * EHCNumber.length)]}`
    window.open(url, '_blank', 'noreferrer')
}
export default directToEHC
