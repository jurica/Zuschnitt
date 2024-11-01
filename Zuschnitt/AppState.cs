using Zuschnitt.Models;
using System.Text.Json;

namespace Zuschnitt;

public class AppState
{
    public Project Project { get; set; }
    public Sheet CurrentSheet { get; set; }

    public AppState()
    {
        Project = new Project();
        CurrentSheet = Project.Sheets.First();
        //InitWithTestdata();
    }

    private void InitWithTestdata()
    {
        string data = @"{""Id"":""211f818f-0006-478b-a619-edb1e98e9823"",""Name"":""Ford Courier"",""Sheets"":[{""Id"":""692871b4-ee14-44fd-b581-1f598490a6b9"",""Name"":""v2"",""Width"":2500,""Height"":1250,""Color"":""black"",""FillColor"":""lightgrey"",""Columns"":[{""Id"":""4e58a39b-48cb-4529-8358-25fa249100e2"",""Color"":""black"",""FillColor"":""purple"",""Parts"":[{""Id"":""95894e15-56ee-4d70-9caf-9aa745cab3cf"",""Name"":""Seitenwand Schrank rechts"",""Width"":846,""Height"":340,""Color"":""black"",""FillColor"":""green""},{""Id"":""ca690197-aa13-4567-924d-dc519505403c"",""Name"":""326 \u002B 410"",""Width"":736,""Height"":340,""Color"":""black"",""FillColor"":""green""},{""Id"":""cc7075c1-fdec-4b9f-aadf-65226a163434"",""Name"":""326 \u002B 436"",""Width"":762,""Height"":340,""Color"":""black"",""FillColor"":""green""},{""Id"":""a8eb705b-c1bd-4ea8-8874-8440c339ace4"",""Name"":""2 x 410"",""Width"":820,""Height"":50,""Color"":""black"",""FillColor"":""green""},{""Id"":""d5590db6-f4ce-45b9-a651-3a7dc3dbb7ff"",""Name"":""410 \u002B 350"",""Width"":760,""Height"":50,""Color"":""black"",""FillColor"":""green""},{""Id"":""d3f1c03a-9bb8-4813-bc02-c3dee582db46"",""Name"":""3 x 250"",""Width"":750,""Height"":50,""Color"":""black"",""FillColor"":""green""},{""Id"":""d96795fc-d8b6-4ffa-bb57-8e1434a00c9a"",""Name"":""250 \u002B 220 \u002B 350"",""Width"":820,""Height"":50,""Color"":""black"",""FillColor"":""green""}]},{""Id"":""5a901180-9378-4b82-9d90-ebfdf20dfaa0"",""Color"":""black"",""FillColor"":""purple"",""Parts"":[{""Id"":""95ffd79d-dd26-4bb0-aeba-234987e83a6d"",""Name"":""Seitenwand Schrank links"",""Width"":1200,""Height"":340,""Color"":""black"",""FillColor"":""green""},{""Id"":""3f7ef936-fbf0-4eac-a031-9d2ba4244771"",""Name"":""Seitenwand Schrank links"",""Width"":1200,""Height"":340,""Color"":""black"",""FillColor"":""green""},{""Id"":""726b9112-9dc2-4a05-b69d-19a623a407cc"",""Name"":""R\u00FCckwand"",""Width"":1200,""Height"":340,""Color"":""black"",""FillColor"":""green""},{""Id"":""ea4cc7b9-3586-45c6-be4e-1369f6647ed0"",""Name"":"""",""Width"":1228,""Height"":50,""Color"":""black"",""FillColor"":""green""},{""Id"":""b8cfc012-6e3a-423c-a081-ef9824a34469"",""Name"":"""",""Width"":1228,""Height"":50,""Color"":""black"",""FillColor"":""green""},{""Id"":""d00cb1b1-002f-4121-bff5-32dd48710560"",""Name"":"""",""Width"":1228,""Height"":50,""Color"":""black"",""FillColor"":""green""},{""Id"":""59cb178a-5bb9-4ae8-a74e-a417ff5b6783"",""Name"":"""",""Width"":1228,""Height"":50,""Color"":""black"",""FillColor"":""green""}]},{""Id"":""7677228f-9a42-4712-8ea1-53efc6b8cc44"",""Color"":""black"",""FillColor"":""purple"",""Parts"":[{""Id"":""d324d900-2716-4a8f-a3b8-f0b0172641ee"",""Name"":""1006 \u002B 120"",""Width"":50,""Height"":1126,""Color"":""black"",""FillColor"":""green""}]},{""Id"":""12451ed5-6a2d-4caf-a557-d5d4fc62300b"",""Color"":""black"",""FillColor"":""purple"",""Parts"":[{""Id"":""4a8310c2-db5e-410e-b3a3-59bdb9ac47d8"",""Name"":""1006 \u002B 120"",""Width"":50,""Height"":1126,""Color"":""black"",""FillColor"":""green""}]}]},{""Id"":""f1a779b8-210d-424a-8046-dea25b3577c8"",""Name"":""v3"",""Width"":1250,""Height"":2500,""Color"":""black"",""FillColor"":""lightgrey"",""Columns"":[{""Id"":""66cc6294-c6a2-4202-826e-cdb371e2efbb"",""Color"":""black"",""FillColor"":""purple"",""Parts"":[{""Id"":""5b77a8a6-5d62-4aa2-b86f-83cc0058efcc"",""Name"":"""",""Width"":340,""Height"":1200,""Color"":""black"",""FillColor"":""green""},{""Id"":""2467924b-4952-4322-8e32-9e577f3fc7c6"",""Name"":"""",""Width"":340,""Height"":1200,""Color"":""black"",""FillColor"":""green""}]},{""Id"":""aab8b14a-63d6-45b6-b051-a50022cb991c"",""Color"":""black"",""FillColor"":""purple"",""Parts"":[{""Id"":""96626b7d-8d84-4159-9303-9771f50fd927"",""Name"":"""",""Width"":340,""Height"":1200,""Color"":""black"",""FillColor"":""green""},{""Id"":""177dde86-31e7-45a9-ae1d-a5063617c911"",""Name"":"""",""Width"":340,""Height"":846,""Color"":""black"",""FillColor"":""green""},{""Id"":""c1cc2553-6b8d-4c91-b386-7dae2dc39ae0"",""Name"":"""",""Width"":340,""Height"":326,""Color"":""black"",""FillColor"":""green""}]},{""Id"":""1e1e6611-ef97-4177-b6fb-36f301d7f1b0"",""Color"":""black"",""FillColor"":""purple"",""Parts"":[{""Id"":""61323a41-ce3c-4f2b-92ae-4e98f2167827"",""Name"":"""",""Width"":340,""Height"":326,""Color"":""black"",""FillColor"":""green""},{""Id"":""dc76ebb0-6154-4368-b12f-ddb2117cdbe9"",""Name"":"""",""Width"":340,""Height"":410,""Color"":""black"",""FillColor"":""green""},{""Id"":""db62865b-8b9e-4ccf-8be8-185537df88c1"",""Name"":"""",""Width"":340,""Height"":446,""Color"":""black"",""FillColor"":""green""}]},{""Id"":""5e680a58-0f45-4c80-a594-94aed8bb3bf7"",""Color"":""black"",""FillColor"":""purple"",""Parts"":[{""Id"":""4fd06ad0-51b3-4ba2-a9c5-43b1343ce070"",""Name"":"""",""Width"":230,""Height"":1200,""Color"":""black"",""FillColor"":""green""}]}]}],""ScaleFactor"":0.57}";
        var p = JsonSerializer.Deserialize<Project>(data);
        if (p != null)
        {
            Project = p;
        }

        CurrentSheet = Project.Sheets.First();
    }
}