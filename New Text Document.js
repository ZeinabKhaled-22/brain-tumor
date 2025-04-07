import XLSX from "xlsx";
export const extractData = async (req, res, next) => {
  const file = req.file;
  const filePath = file.path;
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet);
  for (const ele of jsonData) {
    const doctor = new Doctor({
      fullname: ele["Full Name"],
      price: ele["Price"],
      name: ele["Name"],
      jobTitle: ele["Job Title"],
      bookingInfo: {
        from: ele["Booking info"],
        info: ele["Booking Info 1"],
      },
      visitorRate: ele["Visitors"],
      doctorInfo: ele["Doctor Info"],
      locations: [ele["Location "], ele["Location 1"], ele["Location 2"]],
    });
    await doctor.save();
  }
  const data = await Doctor.find();
  res.json({ data });
};