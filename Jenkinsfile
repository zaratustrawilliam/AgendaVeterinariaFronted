pipeline {
//Donde se va a ejecutar el Pipeline
  agent {
    label 'Slave4_Induccion'
  }

     triggers {
        pollSCM('* * * * *')
    }

    tools {
        jdk 'JDK8_Centos' //Verisión preinstalada en la Configuración del Master
    }
    
//Aquí comienzan los “items” del Pipeline
  stages{
      stage('Checkout') {
      steps{
        echo "------------>Checkout<------------"
        checkout([
            $class: 'GitSCM',
            branches: [[name: '*/master']],
            doGenerateSubmoduleConfigurations: false,
            extensions: [],
            gitTool: 'Default',
            submoduleCfg: [],
            userRemoteConfigs: [[
              credentialsId: 'GitHub_william.vasquez',
              url:'https://github.com/zaratustrawilliam/AgendaVeterinariaFronted.git'
            ]]
        ])
      }
    }


    stage('Install') {
        steps {
            sh 'npm install'
        }
    }

        stage('Build') {
            steps {
              echo '------------>Building<------------'
              sh 'npm run build'
            }
        }

    stage('Tests') {
        steps {
            sh 'npm test'
        }
    }

    stage('Static Code Analysis'){
        steps{
            echo '------------>Analisis de código estático<------------'
            withSonarQubeEnv('Sonar') {
                     sh "${tool name: 'SonarScanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'}/bin/sonar-scanner -Dproject.settings=sonar-project.properties"
            }
        }
    }



  }
  post {
    always {
      echo 'This will always run'
      mail (to: 'william.vasquez@ceiba.com.co',subject: "Failed Pipeline:${currentBuild.fullDisplayName}",body: "Something is wrong with ${env.BUILD_URL}")
    }
    success {
      echo 'This will run only if successful'
      //junit 'build/test-results/test/*.xml'
      //junit '**/test-results/test/*.xml' //RUTA DE TUS ARCHIVOS .XML
    }
    failure {
      echo 'This will run only if failed'
    }
    unstable {
      echo 'This will run only if the run was marked as unstable'
    }
    changed {
      echo 'This will run only if the state of the Pipeline has changed'
      echo 'For example, if the Pipeline was previously failing but is now successful'
    }
  }
}
