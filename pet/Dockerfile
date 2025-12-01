# Frontend için base image
FROM node:18

# Çalışma dizini
WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyalayın
COPY package.json ./
COPY package-lock.json ./

# Node modüllerini yükleyin
RUN npm install

# Uygulama kaynak kodunu kopyalayın
COPY . .

# Uygulamanızı başlatacak komut
CMD ["npm", "start"]

# Uygulama için portu açın
EXPOSE 3000
