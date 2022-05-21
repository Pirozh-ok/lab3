
async function search() {
    let vacancies = document.getElementById("input").value;
    let request = `https://api.hh.ru/vacancies?text=${vacancies}`;
    let response = await fetch(request).then(response => response.json()).then(data => {
        let vac='';
        for(let i = 0; i<data.items.length;i++)
        {
            let salary = ""
            let qq=data.items[i].salary
            if(qq==null)
            {
                salary=' не указана'
            }
            else
            {
                let valuta = qq.currency

                if (qq.from == qq.to)
                {
                    salary = qq.from
                }
                else
                {
                    if (qq.from != null)
                    {
                        salary += "от " + qq.from
                    }
                    if (qq.to != null)
                    {
                        salary += " до " + qq.to
                    }
                }
                    salary +=" "+ valuta
            }
            vac +="---------------------------------"+"\nВакансия: "+data.items[i].name +"\nКомпания: "
                +data.items[i].employer.name+"\nГород: "+data.items[i].area.name+"\nЗарплата: "
                +salary+"\nСсылка: "+data.items[i].alternate_url+"\n---------------------------------"+'\n\n\n'

        }

        document.getElementById("res").innerText=vac;
    })
}
