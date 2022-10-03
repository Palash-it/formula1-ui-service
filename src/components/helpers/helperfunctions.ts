export function getArrayOfYears(yearFrom: number, yearTo: number, step: number){
    let years = [];
    let start = yearFrom;
    while(start <= yearTo){
        years.push(start);
        start = start + step;
    }
    return years;
}