const DataFormate = (value)=>{
    const parts=value.split("/");
    const dt=new Date(Number(parts[2]),Number(parts[1])-1,Number(parts[0]))
    return dt;
    }

    console.log(DataFormate("13/07/2021"));
    