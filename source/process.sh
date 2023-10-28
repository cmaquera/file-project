folder="/workspaces/file-project/source/repository/downloaded"
fileName="2023-Gasto-Diario.csv"
file="$folder/$fileName"

echo "***********************************"
echo "*****     INICIANDO PROCESO   *****"
echo "***********************************"

echo ""
echo "Validar folder..."
if [ ! -d "$folder" ]; then
  echo "Folder no existe $folder"
  echo "Creando folder $folder"
  mkdir -p "$folder"
else
  echo "Folder si existe $folder"
fi

echo "Limpiando folder..."
rm -rfv "$folder"/*

echo ""
echo "*****     DESCARGANDO ARCHIVO   *****"
echo ""
rm -f "$file"
wget --no-check-certificate -O "$file" https://fs.datosabiertos.mef.gob.pe/datastorefiles/2023-Gasto-Diario.csv
echo "Downloaded file $file"
echo ""

echo ""
echo "*****     EXTRACIÓN DE DATOS   *****"
npm start
