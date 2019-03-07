const child_process = require('child_process')
const fs = require('fs')

const BASE_PATH = '../fe-wiki/docs/news'

/**
 * 子进程执行某个命令
 * @param {*} command
 */
const execCommand = (command) => {
  return new Promise((resolve, reject) => {
    const subProcess = child_process.exec(command, (err, stdout) => {
      if (err) {
        console.error(err)
        reject(err)
      } else {
        subProcess.kill()
      }

      resolve({err, outs: stdout})
    })
  })
}

const getFileName=(curYear,weekOfYear)=>{
  let week=weekOfYear
  if(weekOfYear<10){
    week=`0${weekOfYear}`
  }
  return `${curYear}年第${week}周.md`
}

const createFile = (fileName,form) => {
  const {title,type,url,message}=form
  const mdContent=`# ${fileName.replace('.md','')}\n【${type}】[${title}](${url})\n\t${message||''}\n`
  return execCommand(`echo "${mdContent}" >> ${fileName}`)
}

const appendFile = (fileName,form) => {
  const {title,type,url,message}=form
  const mdContent=`\n\n【${type}】[${title}](${url})\n\t${message||''}\n`
  return execCommand(`cd ${BASE_PATH} && echo "${mdContent}" >> ${fileName}`)
}

const moveFile=(fileName)=>{
  return execCommand(`mv ${fileName} ${BASE_PATH}`)
}

const detectFile=(curYear,weekOfYear,form)=>{
  const fileName=getFileName(curYear,weekOfYear)
  if (!fs.existsSync(`${BASE_PATH}/${fileName}`)) {
    console.log(`当前不存在${fileName}文件！将为您创建该文件！`)
    return createFile(fileName,form).then(_=>{
      moveFile(fileName)
    })
  } else {
    console.log( `当前已经存在${fileName}文件！`)
    return appendFile(fileName,form)
  }
}

module.exports={move:detectFile,execCommand}