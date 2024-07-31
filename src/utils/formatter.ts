export function formatDate(date: string): string {
    let [year, month, day] = date.split('-')
    let months: string[] = [
        'janvier', 'février', 'mars', 'avril',
        'mai', 'juin', 'juillet', 'août',
        'septembre', 'octobre', 'novembre', 'décembre'
    ]
    const newMonth: string = months[parseInt(month, 10) - 1]
    return `${day} ${newMonth} ${year}`
}

export function formatRuntime(runtime: number): string {
    let hours: number = Math.floor(runtime / 60)
    let minutes: number = runtime % 60
    return `${hours}h ${minutes}min`
}

export function formatCountry(country: string): string {
    if (country == 'US') return 'États-Unis'
    else if (country == 'FR') return 'France'
    else if (country == 'DE') return 'Allemagne'
    else if (country == 'GB') return 'Grande-Bretagne'
    else if (country == 'CA') return 'Canada'
    else if (country == 'IT') return 'Italie'
    else if (country == 'ES') return 'Espagne'
    else if (country == 'NL') return 'Pays-Bas'
    else if (country == 'RU') return 'Russie'
    else if (country == 'AU') return 'Australie'
    else if (country == 'BR') return 'Brésil'
    else if (country == 'CN') return 'Chine'
    else if (country == 'IN') return 'Inde'
    else if (country == 'JP') return 'Japon'
    else if (country == 'KR') return 'Corée du Sud'
    else if (country == 'MX') return 'Mexique'
    else if (country == 'TR') return 'Turquie'
    else if (country == 'TW') return 'Taïwan'
    else return country
}
